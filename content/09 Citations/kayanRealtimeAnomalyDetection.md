---
title: Real-time Anomaly Detection for Industrial Robotic Arms using Edge Computing
aliases:
  - Kayan et al. ()
project: NA
type: citation
status: open
priority: p5
created: 2025-10-07 16:21
modified: 2025-10-07 16:21
tags:
  - todoist
  - rd
  - citation
zt-attachments:
  - "5307"
zotero-key: JSYSMVTB
people:
  - Ryan Heartfield
  - Pete Burnap
  - Omer Rana
  - Hakan Kayan
  - Charith Perera
citetype: journalArticle
citekey: kayanRealtimeAnomalyDetection
---

# Real-time Anomaly Detection for Industrial Robotic Arms Using Edge Computing
> [!Index Card]
> Journal:: “”
> About::
> Read:: - [ ] Kayan et al. () - **Real-time Anomaly Detection for Industrial Robotic Arms using Edge Computing** ➕2025-10-07 !!2 #rd #citation #todoist
> Print::  ❌
> Zotero Link:: [Zotero](zotero://select/library/items/JSYSMVTB)
> Files:: [attachment](<file:///C:/Users/michaelt/Zotero/storage/YP4QRGZL/Kayan%20et%20al.%20-%20Real-time%20Anomaly%20Detection%20for%20Industrial%20Robotic%20Arms%20using%20Edge%20Computing.pdf>)
> Reading Note::
> Web Rip::
> url::
> ```dataview
> TABLE without id
> file.link as "Related Files",
> title as "Title",
> type as "type"
> FROM "" AND -"Obsidian Assets"
> WHERE citekey = "kayanRealtimeAnomalyDetection" 
> SORT file.cday DESC
> ```

> [!Abstract]
> The integration of Internet of Things (IoT) devices in industrial applications has become viable due to advancements in ubiquitous computing that enable complex machine learning (ML) tasks on resource-constrained devices. Unlike prior approaches that rely on built-in sensors, our system utilizes externally gathered Inertial Measurement Units (IMU) data for anomaly detection. In this paper, we show that simple 1D-CNN and LSTM models on an ultra-low-power device (Nicla Sense ME) optimized for edge-based industrial anomaly detection can achieve approximately 98% accuracy and F1 score in detecting movement-based anomalies (e.g., collisions and joint velocity deviations) in industrial robotic arms. We analyzed an advanced manufacturing scenario where the robotic arm performs three consecutive, distinct tasks (pick-and-place, painting, and screwdriving) and demonstrated that the proposed anomaly detection system is task-independent. We implemented these models ondevice by designing a minimal model architecture and modifying source code to minimize RAM usage and Bluetooth Low Energy (BLE) overhead. Additionally, we examined the challenges of deploying ML models in resource-constrained environments by analyzing various quantization methods and the impact of hyperparameter choices on inference time, accuracy, and memory consumption. Our approach focuses on detecting anomalies directly at the data source which enables true real-time detection with a complete edge computing framework that achieves a 10Hz data frequency and a 250ms inference time when BLE is active. Furthermore, we generated a comprehensive dataset capturing quaternion and IMU data from an industrial robotic arm over 26 hours, including various anomaly scenarios, and made the source code available on GitHub for replicability.
# Quick Reference

# Top Notes

# Tasks
# Annotations

