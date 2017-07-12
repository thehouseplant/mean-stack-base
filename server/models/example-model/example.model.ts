import { Model } from "../model.class";
import { Example } from "./example.schema";

class ExampleModel implements Model {

    public create(newExample: Object) {

        let example = new Example(newExample);

        example.save()
            .then((example) => {

                return example;

            });

    };

    public retrive(query: Object) {

        Example.find(query)
            .then((examples) => {

                return examples;

            });

    };

    public retriveOne(id: String) {

        Example.findById(id)
            .then((example) => {

                return example;

            });

    };

    public update(id: String, example: Object) {

        Example.findByIdAndUpdate(id, example)
            .then((example) => {

                return example;

            });

    }

    public delete(id: String) {

        Example.findByIdAndRemove(id)
            .then((example) => {

                return example;

            });

    }

}

export { ExampleModel };
