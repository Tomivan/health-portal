export const MOCK_DATA = [
    {
        totalAdmin: 4,
        adminData:[ 
            {
            name: "Oluwatosin Omoboyejo",
            email: "oluwatosinracheal@yahoo.com",
            phoneNumber: "02514262819",
            role: " Super Admin"
        },
        {
            name: "Damilola Falade",
            email: "iyanufalay@gmail.com",
            phoneNumber: "02514262819",
            role: "Admin"
        },
        {
            name: "Abisola Ojikutu",
            email: "bisolaojiks@gmail.com",
            phoneNumber: "09023843820",
            role: "Admin"
        },
        {
            name: "Adaobi Umeh",
            email: "adaumeh@gmail.com",
            phoneNumber: "08072920306",
            role: "Admin"
        }
    ]
    },
    {
        totalCaretakers: 3,
        caretakerData: [
            {
                firstname: "Toluwalase",
                lastname: "Idowu",
                email: "idtunmise@gmail.com",
                phoneNumber: "9023842840"
            },
            {
                firstname: "Helen",
                lastname: "Adefemi",
                email: "prettyhelen@gmail.com",
                phoneNumber: "9374727920",
            },
            {
                firstname: "Damilola",
                lastname: "Ogundipe",
                email: "ogundipedamilola@yahoo.com",
                phoneNumber: "2342781920",
            }
        ]
    },
    {
        totalHealthWorkers: 3,
        healthData: [
            {
                firstname: "Esther",
                lastName: "Oluwayomi",
                email: "estheroluwayomi@gmail.com",
                title: "Doctor",
                address: "20, Omorinre Johnson, Lekki, Lagos",
                degree: "Ph.D",
                licenseNumber: "2737290-8377328",
                phoneNumber: "9372637203",
                medicalField: "Psychiatry",
                status: "active",
                bio : "A fun loving Ekiti queen"
            },
            {
                firstname: "Damilola",
                lastName: "adegbenro",
                email: "adegbenromercy@gmail.com",
                title: "Doctor",
                address: "5, Markudi Street, Akure, Ondo",
                degree: "Ph.D",
                licenseNumber: "2737290-8377328",
                phoneNumber: "9928320910",
                medicalField: "Neurosurgery",
                status: "suspended",
                bio: "A strict disciplinarian with a warm heart and a pssion for God"
            },
            {
                firstname: "Oluwaseeun",
                lastName: "Akinola",
                email: "seunakinola@gmail.com",
                title: "Doctor",
                address: "38, Niniola Olanrewaju Street, Saki, Oyo",
                degree: "Ph.D",
                licenseNumber: "2737290-8377328",
                phoneNumber: "9928320910",
                medicalField: "Cardiothoracic",
                status: "active",
                bio: "A fun loving woman who loves baking and family"
            }
        ]
    }, 
    {
        medicalData: [
            {
                healthWorker: "Damilola Adegbenro",
                patient: "Boluwatife Adebisi",
                note: "Diagnosed with stage 2 brain cancer",
                prescriptions: [
                    {
                        treatment: "Brain surgery to remove cancerous cells",
                        recoveryPeriod: "1 month"
                    }
                ]
            },
            {
                healthWorker: "Esther Oluwayomi",
                patient: "Christiana adeoye",
                note: "Diagnosed with celebral malaria",
                prescriptions: [
                    {
                        treatment: "Antiparasitics and antibiotics",
                        recoveryPeriod: "Depends on the prognosis"
                    }
                ]
            },
            {
                healthWorker: "Oluwaseun akinola",
                patient: "Funmilayo Olugbode",
                note: "Diagnosed with Takotsubo cardiomyopathy",
                prescriptions: [
                    {
                        treatment: "Beta blockers, Blood thinners",
                        recoveryPeriod: "Days/weeks"
                    }
                ]
            },
            {
                healthWorker: "Damilola Adegbenro",
                patient: "Abigail Julius",
                note: "Diagnosed with Parkinsons",
                prescriptions: [
                    {
                        treatment: "Managed throughout lifetime",
                        recoveryPeriod: "Managed throughout lifetime"
                    }
                ]
            },
            {
                healthWorker: "Oluwaseun akinola",
                patient: "Ihunanya Okonkwo",
                note: "Diagnosed with coronary artery disease",
                prescriptions: [
                    {
                        treatment: "Angioplasty",
                        recoveryPeriod: "Weeks"
                    }
                ]
            },
        ]
    },
    {   
        totalPatients: 5,
        patientData: 
        [
            {
                username: "adetB",
                email: "adebisiboluwatife@gmail.com",
                gender: "Female",
                type: "basic",
                location:"Igando, Lagos State",
                status: "suspended"
            },
            {
                username: "christy",
                email: "christypraise@gmail.com",
                gender: "Female",
                type: "pro",
                location:"Gbagada, Lagos State",
                status: "active"
            },
            {
                username: "kimbie",
                email: "funmiolugbode@gmail.com",
                gender: "Female",
                type: "premium",
                location:"Surulere, Lagos State",
                status: "active"
            },
            {
                username: "herbeegurl",
                email: "abigailJulius@gmail.com",
                gender: "Female",
                type: "pro",
                location:"Yaba, Lagos State",
                status: "suspended"
            },
            {
                username: "Batman",
                email: "ihunanyaokonkwo@gmail.com",
                gender: "Female",
                type: "premium",
                location:"Ebute-Metta, Lagos State",
                status: "active"
            }
        ]
    },  
    {
        dashboard : {
            healthWorkers: 3,
            patients: 5,
            bookedSessions: 20,
            completedSessions: 15
        }
    }
]