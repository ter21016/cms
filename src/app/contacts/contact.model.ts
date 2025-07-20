export class Contact {
  public id: string;
  constructor(

    public name: string,
    public email: string,
    public phone: string,
    public imageUrl: string,
    public group: Contact[] | null = null
  ) {}
}
