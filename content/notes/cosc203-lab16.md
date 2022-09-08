---
title: "cosc203-lab16"
aliases: 
tags: 

---
VISIT(doctor_id, patient_id, patient_name, date_time, diagnosis, treat_code, charge)
1. No

Should split into different entities

TREATMENT(treat_code, charge)
PATIENT(patient_id, patient_name)
VISIT(patient_id, doctor_id, date_time, diagnosis, treat_code)

2. 