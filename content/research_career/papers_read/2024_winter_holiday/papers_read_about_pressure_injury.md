---
title: 关于压疮（pressure injury）相关的文献阅读
tags:
  - papers
  - pressure-injury
date: 2024-02-25
---


## A Comprehensive and Improved Definition for Hospital-Acquired Pressure Injury Classification Based on Electronic Health Records: Comparative Study

### DOI

http://dx.doi.org/10.2196/40672

### Publication Date

2023.02.23

### Abstract

* Hospitial-acquired pressure injuries(HAPI)是一个重要的护理指标(Nursing Metric)，是医院中最常见的可预防事件。
* 文章想要通过电子健康纪录(electronic health records, EHRs)，构建机器学习模型来识别和预测HAPI。
* 目前存在的问题是，
	* 准确的模型依赖于高质量的HAPI数据标签，然而，**EHR中的不同数据源可能会提供有关于患者发生HAPI的矛盾信息**。
	* 现有的 HAPI 定义彼此不一致，即使在同一患者群体中也是如此。不一致的标准使得无法对机器学习方法进行**基准测试**来预测 HAPI。
* 该文章有着三个目标：
	* 识别EHR中HAPI来源的差异
	* 使用所有 EHR 来源的数据制定 HAPI 分类的全面定义
	* 说明改进 HAPI 定义的重要性
* 该文章使用的方法：评估了MIMIC-III数据库中的临床记录、诊断代码(diagnosis code)、程序代码和图表事件中记录的 HAPI 事件之间的一致性。我们分析了 3 个现有 HAPI 定义所使用w的标准及其对监管指南的遵守情况。提出了Emory HAPI（EHAPI），这是一个改进的、更全面的HAPI定义。然后，我们使用基于树的顺序神经网络分类器评估了标签在训练 HAPI 分类模型中的重要性。
* 最终，文章说明了定义 HAPI 的复杂性，<13% 的住院患者在 4 个数据源中记录了至少 3 个 PI 指征。尽管图表事件是最常见的指标，但它是超过 49% 的停留时间的唯一 PI 文档。我们证明现有 HAPI 定义和 EHAPI 之间缺乏一致性，只有 219 个具有一致的正面标签。我们的分析强调了改进的 HAPI 定义的重要性，使用我们的标签训练的分类器优于护士标注和consensus set(既存在任何PI证据都会标注为阳性)

> [!abstract] 
> 因为HAPI的定义不统一，文章通过使用大量不同EHR来源的数据重现制定HAPI分类的定义并提出EHAPI。通过EHAPI训练分类器会具有更好的性能 。


### Tech Detail

* Center for Medicare and Medicaid(CMS) and Healthcare Research and Quality(AHRQ)认为 HAPI 是“绝不会发生的事件”，即对医疗服务提供者造成严重经济处罚的事件。
* 国家压力性损伤咨询小组 (National Pressure Injury Advisory Panel, NPIAP) 参考指南将设施获得率(facility-acquired)定义为“入院时未发生压力性损伤但在机构逗留期间发生压力性损伤的个体的百分比”。
* Data Sources for PI in Hospital Stays
	* **Chart Events**
		* "chart events"（图表事件）是指医疗记录中的时间序列数据，用于描述患者在医院期间的各种观测值、监测值和测量值。
		* "chart events"包括了多个类别的数据，如生理参数（如血压、心率、体温等）、实验室检查结果（如血液、尿液、生化检验、血药浓度等）、药物治疗（如药物剂量、给药途径等）等等。这些数据通过定期或不定期的观测、监测和测量获得，以在医疗记录中反映患者的病情和生理状态。
	* **Notes**
		* "notes"（笔记）是指医疗记录中的文字描述，其中包含了医生、护士或其他医疗专业人员对患者的病情、治疗方案、手术过程、医嘱等进行详细记录的文本。
		* MIMIC-III数据库中的"notes"包括了各种类型的文本记录，如护理记录、病历摘要、手术报告、放射学报告、心电图诊断、社交史、家族史、既往史等。这些文本记录可提供丰富的信息，包括患者病情发展、诊断过程、治疗决策以及诊疗方案的执行情况等。
	* **Diagnosis Codes**
		* "diagnosis codes"（诊断代码）用于描述患者的疾病诊断，并提供了一种标准化的分类方法。诊断代码通常使用国际分类系统（如ICD-9-CM或ICD-10-CM）提供，并用于追踪、记录和统计患者的诊断信息。
		* MIMIC-III数据库中的诊断代码包括了多种类型的诊断，如主要诊断、次要诊断、手术前诊断等。这些诊断代码能够提供对患者诊断情况的细致描述，包括疾病的类型、严重程度以及可能的并发症等。
	* **Procedure Codes**
		* Procedure Codes（手术代码）是用于描述患者接受的医疗过程或手术的分类标识符。这些代码用于记录患者在医疗过程中所接受的各种医疗和外科手术。手术代码通常由医学编码系统（比如ICD-9-CM或ICD-10-PCS）提供，并用于追踪和统计特定类型的医疗操作。
		* 在MIMIC-III数据库中，Procedure Codes可用于分析和研究多个方面，例如手术类型、手术风险、手术后并发症等。
* Ideal HAPI Criteria Based on Guidelines
	* CMS provides several inclusion and exclusion criteria for HAPI
		* 一项纳入标准是与入院相比，出院时存在一项或多项新的或恶化的 PI。
		* 一项纳入标准是，unstageable PI -> staged
		* 出院评估中缺少新的或恶化的 2、3 和 4 期或不可分期压疮（包括深部组织损伤）的数据，则为exclusion
		* 患者死亡也被记为exclusion
* Existing MIMIC-III HAPI Case Definitions and Their Limitations
	
| Existing Methods for Definitions | Limitations | Reference |
| ---- | ---- | ---- |
| Recurrent additive network for temporal risk prediction(CANTRIP), 专注于预测 HAPI 首次出现 之前 48 至 96 小时或事件日期 (data of event, **DOE**) ,既入院后 48 小时以上首次在带时间戳的医院记录中提及 PI 相关关键词或 PI 分期图事件（≥ 1 期）。没有DOE的数据会被当做对照组 | 该研究中包括已故患者和治愈和改善的患者 | 10.1093/jamia/ocaa004 |
| Cramer 等人试图利用前 24 小时的数据开发一种 PI 筛查工具。他们仅**使用入院 24 小时后发生的 PI 分期图事件来识别 HAPI 病例**。 | 它排除了 1 期 PI 以及“无法分期”和深部组织损伤 PI。与 CANTRIP 类似，Cramer 病例定义包括已故患者和治愈或改善的 PI。 | 10.5334/egems.307 |
| Sotoodeh 等人探索了对临床文本使用否定预处理来检测 PI。病例患者是**使用国际疾病分类 (ICD)-9 代码或临床记录中 PI 特定关键字**来定义的。 | 死亡、治愈或改善的 PI 包含在病例定义;同时，没有考虑PI staging chart events | https://europepmc.org/abstract/MED/33936492 |
| ... | ... | ... |
* **EHAPI Case Definition in MIMIC-III** *Paper's Key Section*
	![](research_career/papers_read/2024_winter_holiday/attachments/Pasted%20image%2020240220005029.png)
	* D: dimension
	* DTI: deep tissue injury



## A systematic review of predictive models for hospital-acquired pressure injury using machine learning

### DOI

10.1002/nop2.1429

### Date

2023.03

### Abstract

该文章为一篇综述，总结机器学习（ML）在医院获得性压力损伤（HAPI）预测中的应用，系统评估机器学习模型的性能和构建过程，为建立高质量的机器学习预测模型提供参考。

文章主要统计的文章为2010 - 2021年在PubMed，Web of Science, Scopus Embase和CINHAL数据库中的文章。纳入标准为使用 **prediction model risk of bias assessment tool(PROBAST)**；最终从1793篇文章中有23项研究入选，样本范围在149-75353，PI发生率在0.5%-49.8%；

目前尚存在的问题为*data management*(idk), data pre-processing, model validation

最终目的是将ML集成到HAPI预测中是为了开发一种实用的临床决策工具。


### Tech deail

* PROBAST 用于评估偏倚风险以及诊断和预后预测模型研究的应用，其中包括四个领域（参与者、预测变量、结果和分析）总共 20 个问题。每个问题和领域的偏见风险可以回答为低、不清楚或高。—— https://doi.org/10.7326/M18-1376


## A systematic review of movement monitoring devices to aid the prediction of pressure ulcers in at-risk adults 

### DOI

10.1111/iwj.13902

### Date

2023.02

### Abstract

文章为一篇综述，探讨运动监测设备对成人压疮（PU）风险预测和预防的影响。文章纳入的标准为英语撰写，采用前瞻性设计，使用运动监测设备评估成年患者在床上的运动。

综述使用 PubMed、CINAHL、Scopus、Cochrane 和 EMBASE 数据库，返回 1537 条记录，其中 25 条符合纳入标准。使用预先设计的提取工具提取数据，并使用循证图书馆管理（EBL）进行质量评估，发现这些研究中总共使用了 19 种不同的运动监测设备。

使用这些运动监测设备重点是量化运动的数量和类型。在四项研究中，作者将监测系统与 pressure ulcars风险评估工具进行了比较，观察到各种高相关性和低相关性。

## An eHealth System for Pressure Ulcer Risk Assessment Based on Accelerometer and Pressure Data

### DOI

10.1155/2015/106537

### Date

2015

### Abstract

基于现有的监测压疮危险因素的系统存在局限性，特别是对于中等风险的人，这篇研究文章提出了一种基于加速度计和压力数据的压疮风险评估的新型电子健康系统。 该系统**结合了加速度计和压力传感器的优点来监测压疮风险因素**。 系统的结构为：传感器检测躺在床垫上的人的重新定位，并将数据发送到平板电脑，在那里进行分析并以图形方式呈现。 该系统在具有中等压疮风险的人家中进行了长期测试评估。 结果表明，该系统能够检测人躺在床上时的运动，并且*运动能力与布雷登压疮风险之间存在微弱的相关性*。 该系统提供的图形说明可以帮助护理人员优化对具有中度至高压溃疡风险的人的护理。


### Tech Detail

![](research_career/papers_read/2024_winter_holiday/attachments/Screenshot%20from%202024-02-20%2015-35-18.png)


## A fabric‑based wearable sensor for continuous monitoring of decubitus ulcer of subjects lying on a bed

### DOI

10.1038/s41598-023-33081-7

### Date

2023.04.08

### Abstract

本文讨论了基于织物的可穿戴传感器的开发，用于连续监测卧床患者的褥疮溃疡。 作者强调了**精确生理信号检测的必要性**，并解决了与*无线通信*、*软*、*非侵入性*和*一次性*的挑战。 

文章主要描述了一种传感器的开发，该传感器使用传统的模拟电路在一次性、基于透气织物的系统中进行无线通信。 该传感器测量压力、温度和皮肤阻抗，并将数据连续连续地发送到手机应用程序。 作者对健康受试者进行了试点测试，以评估传感器的无线操作。 基于织物的传感器成功测量了**施加的压力、皮肤温度和皮肤阻抗**。 文章强调了早期发现褥疮的重要性以及基于织物的传感器监测皮肤状况的潜力。


## An Integrated System of Braden Scale and Random Forest Using Real‑Time Diagnoses to Predict When Hospital‑Acquired Pressure Injuries (Bedsores) Occur

### DOI

10.3390/ijerph20064911

### Date

2023-03-10

### Abstract

文章旨在开发随机森林 (RF) 和 Braden 量表的混合系统，以 预测医院获得性压力损伤 (HAPI) 发生的时间。

之前的研究重点是预测谁将出现 HAPI，但本研究的重点是预测高危患者何时会出现 HAPI。 该研究收集了 485 名患者的实时诊断和危险因素，并使用递归特征消除（RFE）来选择最佳因素。 数据集分为训练集和测试集，并使用带有 RF 的网格搜索来预测 HAPI 时间。 与其他七种算法相比，所提出的模型取得了最佳性能，曲线下面积（AUC）为 91.20，几何平均值（G-mean）为 91.17。 预测 HAPI 时间的最主要的交互风险因素是*住院期间就诊 ICU*(~~应该是一个01变量~~)、Braden 分量表、BMI、刺激麻醉、患者拒绝改变体位以及其他实验室诊断。该研究强调了确定患者何时可能出现 HAPI 以进行早期干预和个性化护理计划的重要性。


### Tech Detail

Bradens Risk Assessment Scale是一种常用于评估患者患压力性溃疡风险的工具。它由6个因素组成，包括感觉知觉、潮湿程度、活动能力、流动的程度、营养状况和摩擦/剪切力。该评估工具通过对这些因素进行评分，以判断患者是否有发生压力性溃疡的风险。

每个因素的评分在1到4之间，总分在6到23之间。较低的总分表示较高的风险，而较高的总分表示较低的风险。通过使用Bradens Risk Assessment Scale，医护人员可以在早期识别患者的风险，并采取相应的预防措施，降低患者患压力性溃疡的风险。



## An Integrated System of Multifaceted Machine Learning Models to Predict If and When Hospital-Acquired Pressure Injuries (Bedsores) Occur

### DOI

10.3390/ijerph20010828

### Date

2023.01.01

### Abstract

文章提出了一项使用机器学习模型预测医院获得性压力损伤 (HAPI) 的研究。 作者强调了现有方法的不足之处，这些*方法仅预测患者是否会发生 HAPI，而不考虑发生的严重程度或时间*。 为了解决这个问题，该研究开发了一个多方面机器学习模型的集成系统。 在第一阶段，使用成本敏感支持向量机的遗传算法 (GA-CS-SVM) 来预测患者是否会出现 HAPI。 在第 2 阶段，采用 SVM 网格搜索 (GS-SVM) 来预测高危患者何时会发生 HAPI。 将所开发模型的性能与最先进的模型进行比较，获得了更好的性能表现。


### Tech Detail

* Dataset
	* 通过EHR中的伤口、造口、失禁和护士笔记来验证HAPI患者
	* 本研究的目的是根据多种风险因素预测患者发生 HAPI 的风险以及预计何时发生 HAPI。包括 Braden 风险评估子量表在内的 98 个风险因素被用作 ML 模型的输入；
	* 同时，模型还要预测严重程度和时间，因此还有第二阶段的数据，具体分布：


![](research_career/papers_read/2024_winter_holiday/attachments/Screenshot%20from%202024-02-20%2016-31-11.png)

* Model Arch
![](research_career/papers_read/2024_winter_holiday/attachments/Screenshot%20from%202024-02-20%2016-32-00.png)


## Bedside Technologies to Enhance the Early Detection of Pressure Injuries

### DOI

10.1097/WON.0000000000000626

### Date

2020.03

### Abstract

该综述包括研究可用于检测压力相关性变白红斑 (PrBE)、压力相关性非变白性红斑 (PrNBE) 和深层组织压力性损伤 (DTPI) 的可用技术。 研究人员对多个数据库进行了系统搜索，并确定了 18 项符合条件的研究，这些研究代表了多种技术，包括**超声波、热成像、表皮下水分测量、反射光谱测定和激光多普勒**。

其中表皮下水分测量为压力损伤的早期检测提供了最一致的结果。

## Detection of Pressure Ulcers Using Electrical Impedance Tomography

### DOI

10.1109/I2MTC48687.2022.9806603

### Date

2022.05.16

### Abstract

本文讨论了使用电阻抗断层扫描 (Eletrical Impedance Tomography, EIT) 检测压疮。 压疮是慢性皮肤伤口，在早期阶段很难发现和监测。 EIT 是一种非侵入性成像技术，可可视化组织中生物电阻抗参数的分布。 该文件提出了一种基于 EIT 和灵活传感器阵列的压疮检测方法。 通过有限元仿真模型和物理实验来评估该方法的有效性。 主要发现表明，EIT 有潜力成为一种更安全、便携、低成本、实时的早期压疮监测系统。 

### Tech detail

* EIT技术能够构建组织电特性分布图像并反映生物组织病变。

## Electrically tunable two-dimensional heterojunctions for miniaturized near-infrared spectrometers

### DOI

10.1038/s41467-022-32306-z

### Date

2022.08.08

### Abstract

一种可以用于检测PI的技术，涉及到电化学， 不懂


## High-quality semiconductor fibres via mechanical design

### DOI

10.1038/s41586-023-06946-0

### Date

2024-02-01

### Abstract

有关于半导体纤维的文章，应该可以用于PI检测中的运动学检测部分，也可以用于皮肤表面压力、阻抗等数据测量的传感器技术支持；暂且不看


## Impedance sensing device enables early detection of pressure ulcers in vivo

### DOI

10.1038/ncomms7575
### Date

2015.03.17
### Abstract

本文讨论了一种灵活的电子设备的开发，该设备可以检测压力引起的组织损伤，即使损伤无法通过肉眼观察到。 该设备使用**柔性电极阵列上的阻抗谱来绘制组织阻抗并将其与组织健康相关联**。 研究人员在大鼠模型上进行了实验，发现阻抗测量值与多种动物和伤口类型的组织健康密切相关。 结果证明了使用该设备作为自动化、非侵入性“智能绷带”来早期检测压疮的可行性。

## In-Advance Prediction of Pressure Ulcers via Deep-Learning-Based Robust Missing Value Imputation on Real-Time Intensive Care Variables

### DOI

10.3390/jcm13010036
### Date

2023.12.20
### Abstract

该文章讨论了用于实时预测压疮（PU）的临床决策支持系统的开发。 该研究利用机器学习 (ML) 和深度学习 (DL) 模型，利用 MIMIC-IV 和江原道国立大学医院 (KNUH) 数据集来预测 PU 的发生。 为了解决时间序列数据中缺失值的挑战，作者提出了一种名为 GRU-D++ 的新型循环神经网络模型。 该模型优于其他实验模型，实现了准时和提前 48 小时 PU 预测的高预测精度。 研究结果表明，GRU-D++模型可以显着减轻医护人员的工作量，并能够及时对ICU内的PU进行干预。

### Tech Detail

![](research_career/papers_read/2024_winter_holiday/attachments/Screenshot%20from%202024-02-20%2017-11-27.png)


## Integrated System for Pressure Ulcers Monitoring and Prevention

### ISBN

978-3-031-26851-9 978-3-031-26852-6
### Date

2023

### Abstract

文章介绍了一个用于压疮监测和预防的集成系统。该系统包括压疮管理门户和移动应用程序，使护理人员能够管理有关患者压疮的临床信息，并为监测提供有用的信息。 该系统考虑了导致压疮的内在和外在因素，并包括数据采集、数据分析和为临床决策提供补充支持的组件。 该研究的主要发现包括开发一个系统，该系统可以提高患者护理质量和安全性，同时最大限度地减少医疗保健专业人员的倦怠。 该系统利用基于传感器的技术和机器学习算法为护理人员提供实时监控并生成警报和建议。



## Machine Learning Techniques, Applications, and Potential Future Opportunities in Pressure Injuries (Bedsores) Management: A Systematic Review

### DOI

10.3390/ijerph20010796

### Date

2023.01.01

### Abstract

该综述的重点是机器学习 (ML) 在管理压力性损伤 (PI) 患者中的应用。 作者总结了 2007 年 1 月至 2022 年 7 月期间机器学习在 PI 管理中的贡献，根据医学专业对研究进行分类，分析差距并确定未来研究方向的机会。 该审查遵循 PRISMA 指南，包括 90 项符合条件的研究。 根据PI发生时间将文章分为三类：发生前、发生时、发生后。 每个类别又根据医学专业进一步细分为子领域，形成十六个领域。 概述和讨论了 PI 管理中最相关和潜在有用的应用和方法，例如深度学习技术和混合模型。 此次审查强调了现有风险评估工具与机器学习的集成，还讨论了 PI 的预防和后果，强调早期检测和个性化护理计划的重要性。 总体而言，该评论提供了对 PI 管理中机器学习应用现状的见解，并确定了未来研究的领域。

### Tech Detail

![](research_career/papers_read/2024_winter_holiday/attachments/Screenshot%20from%202024-02-20%2017-50-52.png)

