class Doctor {
    constructor() {
      this.isAvailable = true;
    }
  }
  
  function calculateWaitingTime(doctors, patientPosition) {
    if (!Array.isArray(doctors) || doctors.length === 0 || patientPosition < 1) {
      return "Invalid input";
    }
  
    const totalDoctors = doctors.length;
    const patientsPerDoctor = Math.ceil(patientPosition / totalDoctors);
  
    // Calculate waiting time
    let waitingTime = 0;
  
    for (let i = 0; i < totalDoctors; i++) {
      const patientsToSee = Math.min(patientsPerDoctor, patientPosition - i * patientsPerDoctor);
      const timeToSeePatients = patientsToSee * (i + 1);
  
      if (doctors[i].isAvailable) {
        doctors[i].isAvailable = false; // Mark the doctor as busy
        waitingTime += timeToSeePatients;
      } else {
        // If the doctor is not available, add waiting time for the next available slot
        const nextAvailableDoctor = doctors.findIndex(doctor => doctor.isAvailable);
        doctors[nextAvailableDoctor].isAvailable = false; // Mark the next available doctor as busy
        waitingTime += timeToSeePatients + (nextAvailableDoctor + 1);
      }
    }
  
    return waitingTime;
  }
  
  // Example usage:
  const numDoctors = 3;
  const doctors = Array.from({ length: numDoctors }, () => new Doctor());
  
  const patientPosition = 8;
  
  const waitingTime = calculateWaitingTime(doctors, patientPosition);
  console.log(`Estimated waiting time for patient at position ${patientPosition}: ${waitingTime} units of time.`);
  