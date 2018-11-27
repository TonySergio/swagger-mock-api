import Chance from 'chance';
import hoek from 'hoek';
const chance = new Chance();

export default class ObjectParser {
    constructor(parser) {
        this.parser = parser;
    }
    canParse(node) {
        return !!node.properties;
    }

    parse(node, additional) {
        return this.generateObject(node, additional);
    }

    generateObject(node, additional) {
        let ret = {};
        let schema = hoek.clone(node);
        schema = schema.properties || schema;
        const array = additional && additional.array;

        for (let k in schema) {
          const isUnique = schema[k].format && schema[k].format == 'uuid';
          let metUnique = false;

          if (isUnique && array) {
            while (!metUnique) {
              let curentVal = this.parser.parse(schema[k]);
              if (!array.find(it => it[k] == curentVal)) {
                metUnique = true;
                ret[k] = curentVal;
              }
            }
          }
          else {
            ret[k] = this.parser.parse(schema[k]);
          }

        }

        return ret;
    }
}
