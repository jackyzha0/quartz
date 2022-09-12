---
title: "cosc203-lab16"
aliases: 
tags: 
- cosc203
- lab
---
VISIT(doctor_id, patient_id, patient_name, date_time, diagnosis, treat_code, charge)
1. No

PATIENT(patient_id, patient_name)
VISIT(patient_id, doctor_id, date_time, diagnosis, treat_code, charge)

2. No

TREATMENT(treat_code, charge)
PATIENT(patient_id, patient_name)
VISIT(patient_id, doctor_id, date_time, diagnosis, treat_code)