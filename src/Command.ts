import ICommandDescriptor from './ICommandDescriptor';

/**
 * A runnable command.
 * 
 * @author Ismael Trentin
 * @version 1.0.0
 */
export class Command {

  /**
   * The command descriptor.
   */
  public static descriptor: ICommandDescriptor<any> = {
    name: 'command',
    category: undefined
  };

  /**
   * The actual command. To execute the command you need to
   * call this property.
   */
  public readonly call: Function;

  /**
   * Instatiates a new Command.
   * 
   * @param func what the command will do
   * @param description the command description
   */
  constructor(func: Function, description?: string) {
    if (Command.descriptor.name.trim() === ''
      || Command.descriptor.name == ''
      || Command.descriptor.name.charAt(0).match(/[0-9]/)) {
      throw 'Invalid command name, must begin with letter.';
    }
    this.call = func;
    if (description) {
      Command.descriptor.description = description;
    }
  }
}