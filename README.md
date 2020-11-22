# djsb-commands

Offers a structure for easly managing commands when making a Discord bot.
Since writing this code over and over can be boring, I have created a vscode snippets extension
to work faster. You can download it [here](https://mega.nz/folder/SgBx2SoJ#-n-FKh5YMD9UGZ7-Ot12nw "djsb-commands-snippets").

---

## Structure

### Class `Command`:

| Property     | Type                    |
| ------------ | ----------------------- |
| `call`       | `Function`              |
| `descriptor` | `ICommandDescriptor<T>` |

- `call`: what the command will do. To execute the command call this property.

- `descriptor`: describes the command. The type parameter is the type that defines the category of the command, an `Enum` is suggested.

### Interface `ICommandDescriptor<T>`:

| Property       | Type                       |
| -------------- | -------------------------- |
| `name`         | `string`                   |
| `category`     | `T`                        |
| `description?` | `string`                   |
| `parameters?`  | `Array<ICommandParameter>` |

- `T`: the type that defines the command category, for example an `Enum`.
- `name`: the name of the command.
- `category`: defines the command category.
- `description?`: the description of the command.
- `parameters?`: all the parameters the command accepts.

### Interface `ICommandParameter`:

| Property    | Type      |
| ----------- | --------- |
| `name`      | `string`  |
| `type`      | `string`  |
| `mandatory` | `boolean` |

- `name`: the name of the parameter.
- `type`: the name of the type of the parameter.
- `mandatory`: defines if the parameter is mandatory, `true` yes `false` no.

---

## Simple walkthrough

When creating a new command, simply create a new Class and extend `Command`.

```typescript
import { Command } from "djsb-commands";

export class HelloWorld extends Command {}
```

The next step is to create the category enum.

```typescript
export enum CommandCategory {
  GENERAL,
  ADMIN,
}
```

The new descriptor can now be set with the correct values.

```typescript
import { Command, ICommandDescriptor } from "djsb-commands";
import CommandCategory from "./CommandCategory";

export class HelloWorld extends Command {
  public static descriptor: ICommandDescriptor<CommandCategory> = {
    name: "helloWorld",
    category: CommandCategory.GENERAL,
    description: "Say hi!",
  };
}
```

Now that the command is correctly described, it's functionality can be overridden.

```typescript
constructor() {
  super(() => {
    console.log('Hello world!');
  });
}
```

> Note: the `Command` constructor also accepts a description as a second parameter.

Time to test the `HelloWorld` command.
In a new ts file:

```typescript
import { HelloWorld } from "./HelloWorld";

new HelloWorld().call();
```

---

## Adding parameters

Like before create a new class that extends `Command`.

```typescript
import { Command } from "djsb-commands";

export class Say extends Command {}
```

This time the parameter must be described. The interface `ICommandDescriptor<T>` has the property `parameters`.
This property is and `Array` of `ICommandParameter`.

Add the parameter to the command descriptor:

```typescript
import { Command, ICommandDescriptor } from "djsb-commands";
import CommandCategory from "./CommandCategory";

export class Say extends Command {
  public static descriptor: ICommandDescriptor<CommandCategory> = {
    name: "say",
    category: CommandCategory.ADMIN,
    description: "Make the bot say something",
    parameters: [
      {
        name: "msg",
        type: "string",
        mandatory: true,
      },
    ],
  };
}
```

Since the `descriptor` says that the command has a parameter, a parameter must be accepted by the command.
The parameters are passed in the `constructor`, they are **not** passed in the `call` property beacause
the intellisense can have problem showing them.

```typescript
constructor(msg: string) {
  super(() => {
    console.log(msg);
  });
}
```

Time to test the `Say` command.
In a new ts file:

```typescript
import { Say } from "./Say";

new Say("Hello everybody!").call();
```

---

## Using it with `discord.js`

In the message event the command can be identified by its descriptor.

```typescript
// Assuming input validation and arguments extraction is already done.
switch (command) {
  case HelloWorld.descriptor.name:
    new HelloWorld().call();
    break;
  case Say.descriptor.name:
    new Say(args[0]).call();
    break;
}
```

Happy bot making!
