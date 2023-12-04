![[Screenshot from 2023-03-14 15-53-57.png]]

**Software Dojos: Iterative Learning**

Software Dojos — or training facilities. With a globally diverse
workforce, we strive to provide ways for our employees to upskill and master DecSecOps
practices to commit to the most effective software delivery. After developing initial skills, adoption and adherence of these best practices can grow over
time. With common training grounds, our employees continue to leverage the best code
across multiple domains.

#article
## The Best of Both Worlds: Agile Development Meets Product Line Engineering at Lockheed Martin

Product line engineering (PLE) brings large-scale improvements in cost, time to market, product quality, and more. It promotes adaptive planning, evolutionary development, early
delivery, continuous improvement, and encourages rapid and flexible response to change
This paper conveys the experience of Lockheed Martin, the world’s largest defense
contractor, as it is applying PLE and Agile together on one of its largest and most important
projects. Not only is the project highly visible with demanding requirements, it is also very
large, comprising some 10 million lines of code

## PLE as Factory

Manufacturers have long used engineering techniques to create a product line of similar
products using a common factory that assembles and configures parts to produce the varying products in the product line. For example, automotive manufacturers can create thousands of unique variations of one car model using a single pool of parts carefully designed to be configurable and factories specifically designed to configure and assemble those parts.

In PLE, the configurator is the factory’s automation component; the “parts” are the assets in
the factory’s supply chain. A statement of the properties desired in the end product tells the
configurator how to configure the assets.

A product specification at the top tells the configurator how to configure the assets coming in from the left.This enables the rapid production of any variant of any of the assets for any of the products in the portfolio. The products can comprise any combination of software, systems in which software runs, or non-software systems that have software-representable artifacts (such as requirements, engineering models, or development plans) associated with the engineering process that produces them.


In this context “product” means not only the primary entity being built and delivered, but also all of the artifacts that are produced along with it. Some of these support the engineering process (such as requirements, project plans, design modes, and test cases), while others are delivered alongside the thing being built (such as user manuals, shipping labels, and parts lists). These artifacts are the product line’s assets.


Shared assets can include, but are not limited to, requirements, design specifications, design models, source code, build files, test plans and test cases, user documentation, repair manuals and installation guides, project budgets, schedules, and work plans, product calibration and configuration files, data models, parts lists, and more.



![[Screenshot from 2023-03-14 16-07-26.png]]


PLE stands in contrast to traditional product-centric development, in which each individual product is developed and evolved independently from other products, or (at best) starts out as a cloned copy of a similar product that is then changed to suit the new product’s specific needs. Product-centric development takes very little advantage of the commonalities among products in a portfolio after the initial clone operation.


a production shop in which N products are developed and maintained. In this stylized view, each product comprises requirements, design models, source code, and test cases. Each engineer in this shop works primarily on a single product. When a new product is launched, its project copies the most similar assets it can find, and starts adapting them to meet the new product’s needs.

![[Screenshot from 2023-03-14 16-08-26.png]]


just enough, just in time” approach with just enough detail to size a project and ensure its technical and economic feasibility.

Agile provides for more level loading and resource allocation. Previously, the response to a looming deadline was to “surge,” adding resources for a milestone and then ramping back down. Now, with better planning and tighter customer involvement, that can avoided. Lessons about teaming are emerging. First, teams should be co-located, if possible. Second, this structure can expose weaker individuals; everyone needs to carry their weight, since there’s no place for mediocre performers to hide on a small team. Not everyone is cut out for this approach, as it requires individuals to perform to their best abilities. Culminating each sprint with a review or demo for the customer (typically showing off new features or architectural improvements) establishes trust and instills confidence in the customer and other stakeholders.

# Recommendations from DOD

Recommendation 1: Software Factory
Recommendation 2: Continuous Iterative Development
		* deliver a series of viable products (starting with MVP) followed by successive next viable products (NVPs);
		* establish MVP and the equivalent of a product manager for each program in its formal
			acquisition strategy, and arrange for the warfighter to adopt the initial operational
			capability (IOC) as an MVP for evaluation and feedback
		* engage Congress to change statutes to transition Configuration Steering Boards (CSB) to support rapid iterative approaches
Recommendation 3: Risk Reduction and Metrics for New Programs
		* Sprint Burndown
		* Epic and Release burndown
		* Velocity
Recommendation 6: Software is Immortal – Software Sustainment
Recommendation 7: Independent Verification and Validation for Machine Learning

![[Screenshot from 2023-03-14 16-20-58.png]]

![[Screenshot from 2023-03-14 16-21-19.png]]

#softwarefactory
