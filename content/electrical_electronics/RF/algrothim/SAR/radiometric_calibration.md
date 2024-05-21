---
title: Radiometric Calibration - 辐射校准
tags:
- SAR
- basic
date: 2023-06-30
---

# Overview
SAR 校准旨在提供其像素值可与场景中的雷达反向散射直接相关的影像。虽然未校准的 SAR 影像足以用于定性用途，但校准后的 SAR 影像对于定量使用 SAR 数据而言仍至关重要。

生成级别 1 影像的典型 SAR 数据处理不包括辐射校正，且仍然存在明显的辐射偏差。因此有必要对 SAR 影像应用辐射校正，*使影像的像素值真正能够反映反射表面的雷达反向散射情况*。在比较由不同的传感器采集的 SAR 影像时，或比较由同一传感器在不同时间、不同模式下采集的（或由不同处理器处理的）SAR 影像时，都需要进行辐射校正。

## Types
* **Sigma nought** - 用于校准地面上单位面积内返回到天线的反向散射，并与地面范围相关。影像经过校准，因此可以直接与相同或不同传感器收集的不同雷达影像进行比较。科学家倾向于使用 sigma naught 来解释表面散射、表面反射以及表面属性。
	* *Scattering coefficient*, or the conventional measure of the strength of radar signals reflected by a distributed scatterer, usually expressed in dB. It is a *normalised dimensionless number*, comparing the strength observed to that expected from an area of one square meter. Sigma nought is defined with respect to the nominally horizontal plane, and in general has a significant variation with **incidence angle**, **wavelength**, and **polarisation**, as well as with **properties of the scattering surface itself**.
* **Beta nought** - 可生成包含雷达亮度系数的数据集（雷达亮度系数是天线发射功率与接收功率之比）。它与倾斜范围有关，且无维度。
* **Gamma** - 通常在校准天线时使用。因为每个范围像元与卫星的距离均相等，所以近距范围和远距范围的亮度均相等，这有助于确定输出数据集中的天线方向图。
* **None** - 不做校正



# Reference

* [Sentinel-1 Radiometric Calibration—ArcMap | Documentation (arcgis.com)](https://desktop.arcgis.com/en/arcmap/latest/manage-data/raster-and-images/sentinel-1-radiometric-calibration.htm)

* [Urban objects detection from C-band synthetic aperture radar (SAR) satellite images through simulating filter properties | Scientific Reports (nature.com)](https://www.nature.com/articles/s41598-021-85121-9)

* [✨✨✨User Guides - Sentinel-1 SAR - Definitions - Sentinel Online - Sentinel Online (esa.int)](https://sentinel.esa.int/web/sentinel/user-guides/sentinel-1-sar/definitions)

