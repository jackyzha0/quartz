---
title: Podstawy
---

## Instalacja
1. Zainstalowanie CLI: `npm i -g @nestjs/cli` 
2. Utworzenie nowego projektu `nest new [nazwa]`

## Struktura projektu 
Podstawową struktury kodu w NestJS są klasy (eng. [[classes]]) oraz dekoratory (eng. [[decorators]]). 

## [[Controllers]]

Controllery to klasy, których zadaniem jest obsługa akcji poszczególnych ścieżek ([[routing]]) aplikacji. Przykładowo jeżeli użytkownik wejdzie na adres `https://brain.overment.com` to na pewnym etapie akcja controllera pobierze niezbędne dane i zwróci odpowiedź. 

W NestJS controller można powiązać ze ścieżką, wykorzystując parametry przekazane do dekoratora Controllera oraz jego Akcji.

Powiązanie controllera ze ścieżką '/users':
```
@Controller('users')
export class UsersController {}
```

Powiązanie akcji controllera ze ścieżką /users/:id. Dodatkowo ta akcja przyjmuje również parametr `id`.
```
export class UsersController {
  **@Get('id')**
  find(@Param('id') id: number) {
  	return `User: ${id}`;
  }
}
```

Akcje kontrolera mogą przyjmować również `request body`. 
```
export class UsersController {
  @Post()
  find(@Body() body) {
  	return `User: ${body.id}`;
  }
}
```

Akcje mogą przyjmować też parametry `query string`
```
export class UsersController {
  @Get()
  find(@Query() query) {
  	return `User: ${query.id}`;
  }
}
```

Akcje mogą zwracać kod statusu
```
export class UsersController {
  @Post()
  @HttpCode(HttpStatus.OK)
  find(@Body() body) {}
}
```

### Tworzenie controllerów
Z pomocą CLI: `nest g co` (lub `nest generate controller`) tworzymy plik controllera i spec.ts.
- flaga --no-spec umożliwia utworzenie controllera bez pliku spec.ts
- podając w nazwie katalog, umieścisz go w podkatalogu
- flaga --dry-run umożliwia przetestowanie polecenia



## [[Services]]
Serwisy umożliwiają rozdzielenie logiki naszej aplikacji na mniejsze części, ułatwiając jej organizację. 


Przykład serwisu:
```
@Injectable()
export class UsersService {}
```

Dodawanie serwisu np. do controllera odbywa się w konstruktorze: 
```
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService)
  // private declares and initializes field
}
```

### Tworzenie serwisów
Z pomocą CLI `nest g s` (lub `nest generate service`) tworzymy plik serwisu i spec.ts

Serwis to zwykła klasa z dektoratorem @Injectable()

W Nest.js każdy serwis to [[Provider]]. Oznacza to, że serwisy mogą przyjmować zależności np. w postaci innych serwisów. 


## [[Modules]]
W NestJS moduły pozwalają na organizowanie logiki biznesowej powiązanych ze sobą fragmentów (np. AuthModule)

Dekorator @Module przyjmuje obiekt zawierający informację o: 
- controllerach (z których korzysta dany moduł)
- exportowanych providerach, które mają być dostępne tam, gdzie importowany jest moduł
- importowanych modułach
- wykorzystywanych providerach, które będą dostępne tylko w tym module

### Tworzenie modułów
Z pomocą CLI `nest g module` tworzymy nowy moduł aplikacji oraz aktualizujemy główny moduł aplikacji (src/app.module.ts)
## [[Data Transfer Objects]]
DTO pozwalają na określenie interfejsów dla danych wejściowych i wyjściowych w aplikacji. Np. z ich pomocą możemy określić kształt wymaganego obiektu. 

DTO to proste obiekty, których rolą jest po prostu określenie struktury danych. Nie zawierają żadnej logiki biznesowej ani czegokolwiek, co wymaga testowania.

Przykład: 
```
export class CreateUserDto {
  name: string;
  brand: string;
  flavors: string[];
}
```

### Tworzenie DTO
Z pomocą CLI `nest g class users/dto/create-user.dto --no-spec`generujemy plik `create-user.dto.ts` eksportujący klasę `CreateUserDto`

## [[Validation]]
- W pliku main.ts dodaj globalPipe: app.useGlobalPipes(new ValidationPipe())
- Zainstaluj class-validator class-transformer

import { IsString } from 'class-validator'

```
export class CreateUserDto {
  @IsString()
  readonly name: string;
  
  @IsString({ roles })
  readonly roles: string[];
}
```
