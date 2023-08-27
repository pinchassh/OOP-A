class Person {
    firstName: string;
    lastName: string;
    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

let IDpatient = 1;
class Patient extends Person {
    patientID: number;
    constructor(firstName: string, lastName: string, patientID: number = IDpatient++) {
        super(firstName, lastName);
        this.patientID = patientID;
    }

    allDetails(): string {
        return `patientID: ${this.patientID},
            firstName: ${this.firstName},
            lastName:${this.lastName}.`;
    }
}

let IDdoctor = 1;

class Doctor extends Person {
    doctorID: number;
    specialization: string;
    constructor(firstName: string, lastName: string, specialization: string, doctorID: number = IDdoctor++) {
        super(firstName, lastName);
        this.specialization = specialization;
        this.doctorID = doctorID;
    }

    doctorDetails(): string {
        return `doctorID: ${this.doctorID},
            firstName: ${this.firstName},
            lastName:${this.lastName},
            specialization: ${this.specialization}.`;
    }
}

class Appointment {
    patient
    doctor
    date
    time
    constructor(patient: Patient, doctor: Doctor, date: string, time: string) {
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
    }

    allDetails(): void {
        console.log(`queue details:
        time: ${this.date}, ${this.time},
        patient:
            ${this.patient.allDetails()},
        doctor:
            ${this.doctor.doctorDetails()}`);
    }
}

class Hospital {
    patients: Patient[];
    doctors: Doctor[];
    queues: Appointment[];
    name: string;
    constructor(name: string) {
        this.patients = [];
        this.doctors = [];
        this.queues = [];
        this.name = name;
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

    allQueuesByDoctorId(id: number): Appointment[] {
        return this.queues.filter(Q => Q.doctor.doctorID === id)
    }

    allQueuesByPatientId(id: number): Appointment[] {
        return this.queues.filter(Q => Q.patient.patientID === id)
    }

    allQTodey(): Appointment[] {
        let munth = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1 < 10}`
        const date = `${new Date().getFullYear()}-${munth}-${new Date().getDate()}`;
        return this.queues.filter(Q => Q.date === date)
    }
}

let patient1 = new Patient('yosy', 'kohen');
let patient2 = new Patient('chaim', 'fain');
let patient3 = new Patient('avi', 'bark');
let patient4 = new Patient('ari', 'shank');
let patient5 = new Patient('Sarah', 'Levi');
let patient6 = new Patient('Daniel', 'Cohen');
let patient7 = new Patient('Rachel', 'Gold');

let doctor1 = new Doctor("John", "Doe", "Cardiology");
let doctor2 = new Doctor("Jane", "Smith", "Pediatrics");
let doctor3 = new Doctor("Michael", "Johnson", "Orthopedics");
let doctor4 = new Doctor("Emily", "Brown", "Dermatology");
let doctor5 = new Doctor("David", "Williams", "Ophthalmology");


let hospital = new Hospital('shiba');

hospital.addPatient(patient1);
hospital.addPatient(patient2);
hospital.addPatient(patient3);
hospital.addPatient(patient4);

hospital.addDoctor(doctor1);
hospital.addDoctor(doctor2);
hospital.addDoctor(doctor3);
// console.log(hospital.doctors);

const appointment1 = new Appointment(patient1, doctor1, '2023-08-27', '10:00 AM');
const appointment2 = new Appointment(patient7, doctor5, '2023-09-26', '12:00 AM');
const appointment3 = new Appointment(patient6, doctor1, '2023-09-26', '12:00 AM');
const appointment4 = new Appointment(patient7, doctor1, '2023-09-26', '12:00 AM');

hospital.addAppointment(appointment1);
hospital.addAppointment(appointment2);
hospital.addAppointment(appointment3);
hospital.addAppointment(appointment4);

// hospital.allAppointment();

// console.log(hospital.allQueuesByDoctorId(1));
// console.log(hospital.allQueuesByPatientId(7));

// console.log(hospital.allQTodey());

























