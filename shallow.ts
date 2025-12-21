class User {
  name: string;

  private setName(name: string) {
    this.name = name;
  }
}

const shallow = new Shallow();
shallow.setName("John");
console.log(shallow.getName());
