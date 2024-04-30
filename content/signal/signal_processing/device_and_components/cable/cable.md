---
title: Cable Study
tags:
  - signal
  - equipment
  - devices
date: 2023-12-05
---
# Structure

![](signal/signal_processing/device_and_components/attachments/Pasted%20image%2020231204110242.png)

* Conductor is located at the center of the cable
* Other layers is to protect

## Conductor Material

* Sliver
* Copper
* Aluminum
* Nickel
* Tin

### Aluminum

#### Pros

* Lightweight
* Affordable
* wide-range used in projects

#### Cons

* Less conductive than copper, another popular option

### Copper

#### Pros

* Moves electricity quickly
* inexpensive
* versatile
* In addition to being used bare, copper can also be dipped. Coating the copper with another metal can enhance specific qualities necessary for different applications.
	* For example, in tinned copper, the layer of tin protects the copper from corrosion at high temperatures and makes the wire last longer.
	* Tinned copper is easier to solder than bare copper, without a huge increase in cost.

### Silver

#### Pros

* The most conductive
* Using silver-plated wire 
	* Can reduce budget and can still provide many of the excellent conductive qualities of silver
	* Wide temperature range,
		* $-65 \degree \text{C} \leftrightarrow 200 \degree \text{C}$    
		* Used in aerospace applications
#### Cons

* High price

### Nickel

#### Pros

* Used in Nickel-plated wire
	* Operate in extreme conditions
	* Wide temperature range
		* If the nickel-plated is thick, it can withstand temperatures up to $750\degree \text{C}$ 
* Excellent corrosion resistance

## Conductor configure


> [!tip] 
>  Conductor is not what they're made of that makes them different, it's also how they're configured


### Solid or Stranrded

Chinese translation: 实心导体和绞合导体

![](signal/signal_processing/device_and_components/attachments/Pasted%20image%2020231204112611.png)
<center><strong>Solid Conductor is in left, Stranded Conductor is in right</strong></center>


#### Solid

* Solid conductors are made of one piece of metal
* Inexpensive
* mechanically tough
* Not flexible

#### Stranded

* Stranded conductors are made of several threads of metal
* Flexible
* a little more expensive
* The Better flexibility can make a big difference in many applications

> [!hint] 
>  根据前哥说的趋肤效应([Skin effect](https://zh.wikipedia.org/wiki/%E9%9B%86%E8%86%9A%E6%95%88%E6%87%89))，高频信号的电子喜欢在金属表面移动，因此实心导体可能已经被淘汰了。
>  
>  [skin effect note](signal/signal_processing/device_and_components/cable/skin_effect.md)

### Stranded Constructions

* Bunched Stranded Conductor
* Concentric Lay Stranded Conductor
* Uni-lay Stranded Conductor
* Rope-lay Stranded  Conductor

#### Bunched Stranded Conductor

![](signal/signal_processing/device_and_components/attachments/Pasted%20image%2020231204114304.png)

![](signal/signal_processing/device_and_components/attachments/Pasted%20image%2020231204114312.png)

Bunched strands are simply gathered together without any specific arrangement.

* Inexpensive

#### Concentric Lay Stranded Conductor

![](signal/signal_processing/device_and_components/attachments/Pasted%20image%2020231204130617.png)

Concentric stranding (同心绞合)

In concentric stranding, the layers alternate in terms of their twist direction.


### Uni-lay Stranding Conductor

Uni-lay Stranding (单向绞合)

In uni-lay stranding, every layer is twisted in the same direction.

> [!info] 
>  Concentric stranded construction provides **better shielding and resistance to external electromagnetic interference**. This type of construction is often used for cables that **require better electromagnetic compatibility (EMC)**, such as in **wireless communications** or **in electromagnetically sensitive environments**.
>  
>  Uni-lay stranded constructions are typically more **flexible for scenarios that require cables to be bent and moved frequently**. This type of construction is commonly used in applications such as flexible cables and connecting cables for **mobile equipment**.


### Rope Lay Stranding Conductor

"Rope lay" is a type of stranded construction for cables or wires where the conductors or strands are twisted together **in a rope-like fashion**. This type of stranded construction is typically used in cables with **large diameters and high strength requirements** to provide greater flexibility and durability.

In a rope lay construction, the stranded conductors or strands are arranged in a spiral fashion to form a rope-like structure. This is a departure from the traditional uni-lay or multi-lay construction.

![](signal/signal_processing/device_and_components/attachments/Pasted%20image%2020231204153959.png)

![](signal/signal_processing/device_and_components/attachments/Pasted%20image%2020231204154015.png)



# Cable Structure

![](signal/signal_processing/device_and_components/attachments/Pasted%20image%2020231204160536.png)

![](signal/signal_processing/device_and_components/attachments/Pasted%20image%2020231204165012.png)

1. **Standard Conductor（标准导体）：**
    
    - **功能：** 标准导体是电缆中的金属导体，通常采用铜或铝，用于传导电流。
    - **特点：** 导体的直径和材料的选择取决于电缆的用途、电流负荷以及其他设计要求。
2. **Conductor Screen（导体屏蔽）：**
    
    - **功能：** 导体屏蔽是一层半导体材料，包裹在导体表面，旨在提供电场屏蔽，减小电缆内的电场梯度。
    - **特点：** 通常采用半导体橡胶或半导体聚乙烯作为导体屏蔽材料。
3. **Insulation（绝缘）：**
    
    - **功能：** 绝缘是包围在导体周围的材料，用于阻止电流流失，防止导体之间或导体与地之间发生短路。
    - **材料：** 常见的绝缘材料包括聚乙烯（PE）、聚氯乙烯（PVC）、交联聚乙烯（XLPE）等。
4. **Insulation Screen（绝缘屏蔽）：**
    
    - **功能：** 绝缘屏蔽是绝缘层外的一层半导体材料，有助于提高电缆的电场均匀分布。
    - **材料：** 通常采用与绝缘相似的半导体材料。
5. **Metallic Sheath（金属护套）：**
    
    - **功能：** 金属护套是电缆的外部保护层，提供机械强度、防水、抗化学腐蚀等保护。
    - **材料：** 金属护套通常由铝或镀锌钢带制成，提供额外的电磁屏蔽。
6. **Bedding（铺底层）：**
    
    - **功能：** 铺底层是位于绝缘层和金属护套之间的一层材料，提供机械保护和防水功能。
    - **材料：** 常见的铺底层材料包括聚乙烯（PE）、聚氯乙烯（PVC）等。
7. **Armouring（铠装层）：**
    
    - **功能：** 铠装层提供额外的机械强度，使电缆能够抵抗外部的物理损伤，如挤压、拉伸等。
    - **类型：** 铠装可以是钢丝铠装（SWA）或铝丝铠装（AWA），根据需要选择。
8. **Serving（编织层）：**
    
    - **功能：** Serving是电缆的编织层，位于导体或绝缘层与护套之间，提供机械强度、防护绝缘层的功能，改善电缆的柔韧性和耐弯曲性能。
    - **材料：** Serving通常由金属线、纤维线或其他合适的材料编织而成。
9. **Jacket（护套）：**
    
    - **功能：** 护套是电缆的最外层，提供额外的机械保护、防水、耐化学腐蚀等性能。
    - **材料：** 常见的护套材料包括聚氯乙烯（PVC）、聚乙烯（PE）、低烟无卤（LSZH）、聚氨酯（PUR）等。


## Shield (or screen)

> [!tip] 
> 在电缆术语中，"shield"（屏蔽层）和"screen"（屏蔽层）有时可以互换使用，具体取决于上下文和地区的说法。通常情况下，这两个术语都指的是电缆中用于提供电磁屏蔽的层。下面对这两个术语进行简要澄清：
> 
> 1. **Shield（屏蔽层）：**
>     - "Shield" 是一个通用术语，用于描述电缆中的各种用于屏蔽的层。这可以包括对导体周围的屏蔽、对绝缘层的屏蔽等。因此，当说到屏蔽层时，可以用"shield"这个术语，而这个层可能是导体屏蔽、绝缘屏蔽或其他形式的屏蔽。
>  2. **Screen（屏蔽层）：**
>      - "Screen" 是电缆领域中一种更常见的术语，通常用于指代屏蔽层。在某些地区，人们更倾向于使用"screen"这个词来描述电缆中的屏蔽。同样，这可能包括对导体周围的屏蔽、对绝缘层的屏蔽等。
>        
>  总体而言，这两个术语在许多情况下可以互换使用，但具体的使用可能会受到地区和行业的影响。在一些国家或特定标准中，可能更倾向于使用其中一个术语而不是另一个。因此，在特定上下文中，最好查看相关的标准或规范以确定使用的确切术语。


### Shield Type

1. **Foil Shield（箔屏蔽）：**
    
    - **结构：** 箔屏蔽是由一层薄金属箔（通常是铝）构成的。这层箔紧贴在绝缘层或导体屏蔽的外表面。
    - **特点：** 箔屏蔽提供了对高频电磁干扰的有效屏蔽，并且相对轻巧灵活。它通常用于对频率要求较高的应用中，例如通信电缆。
2. **Braid Shield（编织屏蔽）：**
    
    - **结构：** 编织屏蔽由金属线（通常是铜或铝）编织而成，覆盖在绝缘层或导体屏蔽的外表面。
    - **特点：** 编织屏蔽提供了较好的机械强度和耐挠性，适用于柔性电缆或需要频繁弯曲的场合。它也提供了良好的电磁屏蔽效果。
3. **Spiral Shield（螺旋屏蔽）：**
    
    - **结构：** 螺旋屏蔽由金属带或金属线以螺旋状绕绕在电缆的绝缘层或导体屏蔽上。
    - **特点：** 螺旋屏蔽相对于编织屏蔽来说更容易施工，但在机械强度和电磁屏蔽性能方面可能略逊一筹。
4. **Combination Shield（组合屏蔽）：**
    
    - **结构：** 组合屏蔽是指在同一电缆中使用多种不同类型的屏蔽，例如在导体上先使用箔屏蔽，然后外面再套用编织屏蔽。
    - **特点：** 组合屏蔽结合了不同类型屏蔽的优势，提供了更全面的电磁屏蔽效果，适用于一些对电磁兼容性要求较高的应用。

### Shield vs. Armor

> [!tip] 
> Shield vs. Armor
> 
> Shield is to protect the integrity of the signal armor is primarily used to prevent physical damage to the cable itself.


# Letters on Cable

![](signal/signal_processing/device_and_components/attachments/Pasted%20image%2020231204160640.png)

## Size

* AWG - [American Wire Gauge](signal/signal_processing/device_and_components/cable/AWG.md)
* $mm^2$ - Square millimeters
* MCM - Thousand Circular Mils
* KCMil - Thousand Circular Mils

1MCM = 1KCMil = 0.5067 $mm^2$

## Insulation type and application

* T - Thermoplastic 
* E - Elastomer
* R - Rubber
* H - Temperature resistance of 75$\degree \text{C}$
* HH - Heat resistance of 90$\degree\text{C}$
* N - Nylon covered
* O - Oil Resistant Jacket
* OO - Oil Resistant Jacket & Oil Resistant Insulation
* W - Weather and Water resistance, -60$\degree\text{C}$
* PV - Photovoltaic / Solar power cable, temperature resistance of 105$\degree\text{C}$
* XLPE - Cross-linked polyethylene, for medium and high voltage purpose (600V - 11kV above)
* MI - Mineral Insulated, fire retardant

## Rated Voltages

* S - Service, the cable is rated to 600 volts
* J - Junior, the cable is rated to 300 volts
* Number

## Quality Control Certified

* [UL, TUV, ISO ... ...](signal/signal_processing/device_and_components/quality_control_certified/qcc.md)

# Cable Properties - Especially for RF circuit

## Intro

**RF cables are an often overlooked part of the whole RF setup**, so you've got your right kit you've got your right frequencies, you've tuned it up all good you placed your antennas in the right place, but it's very very very easy to shoot yourself in the foot by selecting the wrong antenna cables.

RF cables are quite different to audio cables. As in audio cables we can run cables for a long long long distance without actually inducing much loss. At all RF cables are relatively lossy by comparison the amount of loss you get inside of a cable will be dependent on three different things.

* Quality of the cable
* Frequency you're currently trying to transmit
* The length of the cable

RF circuits need to consider impedance matching, and the most likely to fluctuate in impedance is the cable. So the antenna cable we used for our radio systems is usually **[coax cable](signal/signal_processing/device_and_components/cable/coax_cable.md) with a nice BNC connector**.



# Reference

* [_Cable Basics 101: Conductors - Brought to You by Allied Wire & Cable_. _www.youtube.com_, https://www.youtube.com/watch?v=gtAaZ2hFYTA. Accessed 4 Dec. 2023.](https://www.youtube.com/watch?v=gtAaZ2hFYTA)
* [_Cable Construction | Design & Technology | Atlas Cables_. https://www.atlascables.com/design-construction.html. Accessed 4 Dec. 2023.](https://www.atlascables.com/design-construction.html)
* [“集膚效應.” 维基百科，自由的百科全书, 21 Aug. 2022. _Wikipedia_, https://zh.wikipedia.org/w/index.php?title=%E9%9B%86%E8%86%9A%E6%95%88%E6%87%89&oldid=73309042.](https://zh.wikipedia.org/wiki/%E9%9B%86%E8%86%9A%E6%95%88%E6%87%89)
* [_Cable Properties - CompTIA Network+ N10-004: 2.1_. _www.youtube.com_, https://www.youtube.com/watch?v=2DLwqWDg2uw. Accessed 5 Dec. 2023.](https://www.youtube.com/watch?v=2DLwqWDg2uw)
* [_How to Read Wire and Cable Markings._ _www.youtube.com_, https://www.youtube.com/watch?v=O1iooveG3-4. Accessed 5 Dec. 2023.](https://www.youtube.com/watch?v=O1iooveG3-4)
* [_Understanding RF Cables_. _www.youtube.com_, https://www.youtube.com/watch?v=y2kroLxp3ZQ. Accessed 5 Dec. 2023.](https://www.youtube.com/watch?v=y2kroLxp3ZQ)
* [_Coaxial Cable - Lesson 2_. _www.youtube.com_, https://www.youtube.com/watch?v=HD5ODAdl1Ow. Accessed 5 Dec. 2023.](https://www.youtube.com/watch?v=HD5ODAdl1Ow)