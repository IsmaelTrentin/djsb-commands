import ICommandParameter from './ICommandParameter';

/**
 * Describes a command.
 * The type paramets defines the object that represents
 * the command category. For example an enum with
 * all the possible categories.
 * 
 * @author Ismael Trentin
 * @version 1.0.0
 */
export default interface ICommandDescriptor<T> {

  /**
   * The command name.
   */
  readonly name: string;

  /**
   * The command category object.
   * Suggested: Enum.
   */
  category: T;

  /**
   * The command description.
   */
  description?: string;

  /**
   * The command parameters.
   */
  parameters?: Array<ICommandParameter>;
}