/**
 * Defines a command parameter.
 * 
 * @author Ismael Trentin
 * @version 1.0.0
 */
export interface ICommandParameter {

  /**
   * The name of the parameter.
   */
  name: string;

  /**
   * The name of the type of the parameter.
   */
  type: string;

  /**
   * Defines if the parameter is mandatory,
   * true yes, false no.
   */
  mandatory: boolean;
}