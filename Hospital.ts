abstract class Person {
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    constructor(firstName: string,
        lastName: string,
        age: number,
        address: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.address = address;
    }
    allDeteils(): string { return 'diteils...' }
}

let IDpatient = 1;
class Patient extends Person {
    patientID: number;
    phoneNumbe: number;
    emergencyContact: number;
    medicalHistory: Appointment[];

    constructor(firstName: string,
        lastName: string,
        patientID: number = IDpatient++,
        phoneNumbe: number,
        emergencyContact: number,
        age: number,
        address: string) {
        super(firstName, lastName, age, address);
        this.patientID = patientID;
        this.phoneNumbe = phoneNumbe;
        this.emergencyContact = emergencyContact;
        this.medicalHistory = [];
    }

    allDeteils(): string {
        return `patientID: ${this.patientID},
            firstName: ${this.firstName},
            lastName:${this.lastName}.`;
    }

    addOfMedicalHistory(appoint: Appointment): void {
        this.medicalHistory.push(appoint)
    }
}

class MedicalStaff extends Person {
    staffID: number;
    position: string;
    department: string;

    constructor(
        staffID: number,
        position: string,
        department: string,
        firstName: string,
        lastName: string,
        age: number,
        address: string) {
        super(firstName, lastName, age, address);
        this.staffID = staffID;
        this.position = position;
        this.department = department;
    }
}

let IDdoctor = 1;

class Doctor extends MedicalStaff {
    doctorID: number;
    specialization: string;
    availability: string[];
    range: [number, number];

    constructor(
        firstName: string,
        lastName: string,
        address: string,
        age: number,
        doctorID: number = IDdoctor++,
        specialization: string,
        staffID: number,
        position: string,
        department: string
    ) {
        super(staffID, position, department, firstName, lastName, age, address);
        this.specialization = specialization;
        this.doctorID = doctorID;
        this.availability = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
            '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'];
    }

    checkRange(age: number): boolean {
        return age > this.range[0] && age < this.range[1]
    }

    allDeteils(): string {
        return `doctorID: ${this.doctorID},
            firstName: ${this.firstName},
            lastName:${this.lastName},
            specialization: ${this.specialization}.`;
    }

    checkTime(time: string): boolean {
        return this.availability.includes(time)
    }

    uppdateAvailability(appoint: string): string[] {
        return this.availability.filter(time => time !== appoint)
    }
}

function newDate() {
    let munth = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1 < 10}`
    const date = `${new Date().getFullYear()}-${munth}-${new Date().getDate()}`;
    return date
}
class Appointment {
    patient
    doctor
    date
    time
    statusQ
    constructor(patient: Patient, doctor: Doctor, date: string|number, time: string) {
        try {
            if (this.doctor.checkTime(time)
                && this.doctor.checkRange(this.patient.age)) {
                this.patient = patient;
                this.doctor = doctor;
                this.date = date;
                this.time = time;
                this.statusQ = this.status();
                this.doctor.uppdateAvailability(time);
                this.patient.addOfMedicalHistory(this);
            }
        } catch (error) {
            console.error(error);
        }
    }

    status(): string {
        if (this.statusQ !== 'cancelled') {
            if (new Date(this.date) < new Date(newDate())) this.statusQ = 'completed';
            else this.statusQ = 'Planned'
        }
        return this.statusQ
    }

    allDetails(): void {
        console.log(`queue details:
        status:${this.statusQ},
        time: ${this.date}, ${this.time},
        patient:
            ${this.patient.allDetails()},
        doctor:
            ${this.doctor.doctorDetails()}`);
    }
}

class MedicalRecord {
    patients: Patient;
    doctors: Doctor;
    diagnosis
    prescription

    constructor(patients: Patient, doctors: Doctor, diagnosis: string, prescription: string) {
        this.patients = patients;
        this.doctors = doctors;
        this.diagnosis = diagnosis;
        this.prescription = prescription;
    }

}
class Hospital {
    patients: Patient[];
    doctors: Doctor[];
    queues: Appointment[];
    name: string;
    medicalRecord: MedicalRecord[];

    constructor(name: string) {
        this.patients = [];
        this.doctors = [];
        this.queues = [];
        this.name = name;
        this.medicalRecord=[]
    }

    addPatient(patient: Patient): void {
        this.patients.push(patient)
    }

    addDoctor(doctor: Doctor): void {
        this.doctors.push(doctor)
    }

    addAppointment(queue: Appointment): void {
        this.queues.push(queue)
    }

    allAppointment(): void {
        for (const Q of this.queues) {
            Q.allDetails();
        }
    }

    allQueuesByDoctorSpecialization(special: string): Appointment[] {
        return this.queues.filter(Q => Q.doctor.specialization === special)
    }

    allQueuesByPatientId(id: number): Appointment[] {
        return this.queues.filter(Q => Q.patient.patientID === id)
    }

    allQueuesByDoctorId(id: number): Appointment[] {
        return this.queues.filter(Q => Q.doctor.doctorID === id)
    }

    getDoctorSchedule(date: string, id: number): Appointment[] {
        return this.queues.filter(Q => Q.doctor.doctorID === id &&
            Q.statusQ === 'Planned' &&
            new Date(Q.date) === new Date(date))
    }

    getDoctorAvailability(id: number) {
        return this.doctors.filter(avail => avail.doctorID === id).map(time => time.availability)
    }
    allQTodey(): Appointment[] {
        return this.queues.filter(Q => Q.date === newDate())
    }

    createMedicalRecord(patients: Patient,
        doctors: Doctor,
        diagnosis: string,
        prescription: string) {
        const newMdic = new MedicalRecord(patients, doctors, diagnosis, prescription)
        this.medicalRecord.push(newMdic)
    }

    getMedicalRecords(id: number): MedicalRecord[] {
        return this.medicalRecord.filter(Q => Q.patients.patientID === id)
    }
}
