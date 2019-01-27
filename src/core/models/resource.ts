/**
 * Base class for a resource. This allows us to auto map a service to the resource's endpoint
 */
export abstract class Resource {
  /**
   * Required fields
   **/
  static resourcePath = '';
  abstract id: number | string;

  isValid(): boolean {
    if (this.id) {
      return true;
    }
    return false;
  }
}
