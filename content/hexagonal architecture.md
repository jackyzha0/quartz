Hexagonal Architecture, also known as Ports and Adapters Architecture, is a software architecture pattern that aims to create loosely coupled components to make applications more maintainable and adaptable. This architecture promotes the separation of concerns by externalizing the inputs and outputs of the application. Let's break down its core concepts step by step:

### 1. Core Logic (Domain):

- **Center of Your Application**: The domain logic (business logic) is at the center of your application. This includes your business rules, models, and entities. It is the heart of your application's functionality.
- **Independence from External Concerns**: The domain should be independent of external elements like databases, external services, or user interfaces.

### 2. Ports:

- **Interfaces to the Core Logic**: Ports are interfaces that define how the outside world can communicate with the application's core logic. They represent the entry and exit points for data.
- **Primary (Driving) Ports**: These are usually the interfaces that your application provides to the outside world (e.g., a web API interface for a web application).
- **Secondary (Driven) Ports**: These are interfaces that your application uses to interact with external components (e.g., database, message broker).

### 3. Adapters:

- **Connectors Between Ports and External Concerns**: Adapters are implementations of the ports. They translate the external world (like a web interface, database, or third-party service) into a format that the application's core logic can understand, and vice versa.
- **Primary (Driving) Adapters**: These adapt the external input to the application's needs (e.g., a web controller that takes HTTP requests and converts them to service calls).
- **Secondary (Driven) Adapters**: These adapt the application's output to the requirements of the external world (e.g., a repository implementation that takes domain objects and stores them in a database).

### 4. Independence and Interchangeability:

- **Loose Coupling**: By separating the core logic from external concerns, you can change one part without significantly affecting others. For instance, you can replace a database or change a web service without needing to alter the business logic.
- **Testability**: This architecture enhances testability. You can test the domain logic in isolation from external elements like databases and web services.

### 5. Flow of Control:

- **Inward Dependency Rule**: Dependencies point inwards. The inner layers (domain) do not depend on the outer layers (adapters and external elements). This means that the business logic is not affected by changes in external services or databases.

### Example in a Web Application Context:

1. **Domain**: Contains entities like `User` and `Order`, and business rules for handling them.
2. **Ports**: Define interfaces like `UserRepository` for data access and `OrderService` for operations on orders.
3. **Adapters**: 
   - **Primary Adapters**: Web controllers that take HTTP requests and call the appropriate services in the domain.
   - **Secondary Adapters**: Implementations of `UserRepository` that interact with a SQL database to store and retrieve user data.
4. **Flow**: An HTTP request is received by a controller (Primary Adapter), which then uses the domain services (through Ports) to process the request. The domain services might interact with the database through a repository interface (Secondary Port), which is implemented by an adapter.

By following this pattern, applications become easier to maintain, test, and extend, as changes in one part of the system have minimal impact on others. This architecture is particularly useful in complex applications where the business logic needs to be clearly separated from external concerns.

![[Pasted image 20240107053824.png]]

[[Go Common Mistakes]]


