abstract class Model {

    public create     ( model: Object ) : void {}
    public retrive    ( query: Object ) : void {}
    public retriveOne ( id: String ) : void {}
    public update     ( id: String, model: Object ) : void {}
    public delete     ( id: String ) : void {}

}

export { Model }
