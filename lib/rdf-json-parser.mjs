import { dataFactory, datasetFactory } from "../deps.mjs";

// https://www.w3.org/TR/rdf-json/

/**
 * Parses an RDF-JSON object and produces an RDF dataset.
 *
 * @param {object} rdfJson - The RDF-JSON object to parse.
 * @returns {import('@rdfjs/types').Dataset} An RDF dataset.
 * @throws {TypeError} If the input is not a valid RDF-JSON object.
 */
export function parse(rdfJson) {
  if (typeof rdfJson !== 'object' || rdfJson === null) {
    throw new TypeError('Invalid RDF-JSON: Input must be an object.');
  }

  const dataset = datasetFactory.dataset();

  for (const subject in rdfJson) {
    if (!rdfJson.hasOwnProperty(subject)) continue;
    // console.debug(`Subject: ${subject}`);

    const 
    subjectNode = createTerm(subject),
    predicates  = rdfJson[subject];

    if (typeof predicates !== 'object' || predicates === null) {
      throw new TypeError(`Invalid RDF-JSON: Predicates for subject '${subject}' must be an object.`);
    }
    
    for (const predicate in predicates) {
      if (!predicates.hasOwnProperty(predicate)) continue;
      // console.debug(`  Predicate: ${predicate}`);


      const
      predicateNode = createTerm(predicate),
      objects       = predicates[predicate];

      if (!Array.isArray(objects)) {
        throw new TypeError(`Invalid RDF-JSON: Objects for predicate '${predicate}' of subject '${subject}' must be an array.`);
      }

      for (const objectData of objects) {
        if (typeof objectData !== 'object' || objectData === null || !objectData.hasOwnProperty('value'))
          throw new TypeError(`Invalid RDF-JSON: each object in objects list must have at least the value key.`);
        // console.debug(`    Object: ${JSON.stringify(objectData)}`);

        const
        objectNode = createObjectTerm(objectData),
        quad       = dataFactory.quad(subjectNode, predicateNode, objectNode);

        dataset.add(quad);
      }
    }
  }

  return dataset;
}

/**
 * Creates an RDF term from a URI or blank node identifier.
 *
 * @param {string} termString - The URI or blank node identifier.
 * @returns {import('@rdfjs/types').NamedNode | import('@rdfjs/types').BlankNode} An RDF term.
 */
function createTerm(termString) {
  if (termString.startsWith('_:')) {
    // console.debug(`${termString} is a bnode`)
    return dataFactory.blankNode(termString.substring(2));
  } else {
    // console.debug(`${termString} is a uri`)
    return dataFactory.namedNode(termString);
  }
}

/**
 * Creates an RDF object term from an RDF-JSON object description
 *
 * @param {object} objectData - the object from the RDF-JSON object description
 * @returns {import('@rdfjs/types').NamedNode | import('@rdfjs/types').BlankNode| import('@rdfjs/types').Literal}
 * @throws {Error} if the object description is not correct.
 */
function createObjectTerm(objectData) {
    const value = objectData.value;
    const datatype = objectData.type;
    const language = objectData.lang;

    if(datatype === 'literal') {
      // console.debug(`${value} is a literal`)
      return dataFactory.literal(value, language);
    }

    // no datatype and no language means it's a IRI or blank node
    return createTerm(value);

}
