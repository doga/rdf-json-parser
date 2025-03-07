import { dataFactory, datasetFactory } from "../deps.mjs";

/**
 * Serialises an RDF dataset to an RDF-JSON object.
 *
 * @param {import('@rdfjs/types').Dataset} dataset - The RDF dataset to serialise.
 * @returns {object} An RDF-JSON object.
 * @throws {TypeError} If the input is not a valid RDF dataset.
 */
export function serialise(dataset) {
  // BUGgy test
  // if (!dataset || typeof dataset.match !== 'function' || typeof dataset.toArray !== 'function') {
  //   throw new TypeError('Invalid RDF dataset: Input must be an RDF dataset.');
  // }

  const rdfJson = {};

  for (const quad of dataset) {
    const subject = serialiseTerm(quad.subject);
    const predicate = serialiseTerm(quad.predicate);
    const object = serialiseObjectTerm(quad.object);

    if (!rdfJson[subject]) {
      rdfJson[subject] = {};
    }

    if (!rdfJson[subject][predicate]) {
      rdfJson[subject][predicate] = [];
    }

    rdfJson[subject][predicate].push(object);
  }

  return rdfJson;
}

/**
 * Serialises an RDF term to a string.
 *
 * @param {import('@rdfjs/types').Term} term - The RDF term to serialise.
 * @returns {string} The string representation of the term.
 * @throws {TypeError} If the term is not a NamedNode or BlankNode.
 */
function serialiseTerm(term) {
  if (term.termType === 'NamedNode') {
    return term.value;
  } else if (term.termType === 'BlankNode') {
    return '_:' + term.value;
  } else {
    throw new TypeError(`Invalid term type: ${term.termType}. Only NamedNode and BlankNode are supported for subjects and predicates.`);
  }
}

/**
 * Serialises an RDF object term to an RDF-JSON object.
 *
 * @param {import('@rdfjs/types').Term} term - The RDF object term to serialise.
 * @returns {object} The RDF-JSON object representation of the term.
 */
function serialiseObjectTerm(term) {
  if (term.termType === 'NamedNode' || term.termType === 'BlankNode') {
    const type = term.termType === 'NamedNode' ? 'uri' : 'bnode';
    return { value: serialiseTerm(term), type};
  } else if (term.termType === 'Literal') {
    const object = { value: term.value, type: 'literal' };
    if (term.language) {
      object.lang = term.language;
    }
    if(
      term.datatype.value !== 'http://www.w3.org/2001/XMLSchema#string' && 
      term.datatype.value !== 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString' && 
      term.datatype.value !== undefined
    ){
      object.datatype = term.datatype.value;
    }
    return object;
  } else {
    throw new TypeError(`Invalid term type: ${term.termType}. Only NamedNode, BlankNode and Literal are supported for objects.`);
  }
}
