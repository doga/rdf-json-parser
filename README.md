<p align="left">
<a href="https://rdf.js.org/" target="_blank" rel="noreferrer"><img src="https://github.com/doga/doga/raw/main/logos/rdf.svg" height="85" alt="RDF logo" /></a>
</p>

# An RDF-JSON parser

A JavaScript library for parsing RDF-JSON.

## Usage examples

_Tip: Run the examples below by typing this in your terminal (requires [Deno](https://deno.com/) 2+):_

```shell
deno run --allow-net --allow-run --allow-env --allow-read jsr:@andrewbrey/mdrb@3.0.4 --dax=false --mode=isolated https://raw.githubusercontent.com/doga/rdf-json-parser/refs/heads/main/README.md
```

<details data-mdrb>
<summary>RDF-JSON serialisation</summary>

<pre>
description = '''
Parse RDF-JSON to/from an RDF dataset.
'''
</pre>
</details>

```javascript
import {parse, serialise} from 'https://esm.sh/gh/doga/rdf-json-parser@1.1.0/mod.mjs';

const 
rdfJsonIn = {
  "http://example.org/about" : {
    "http://purl.org/dc/terms/title" : [
      { "value" : "Anna's Homepage", "type" : "literal", "lang" : "en" },
      { "value" : "Annas hjemmeside", "type" : "literal"},
      { "value" : "https://vocab.qworum.net/user/", "type" : "uri"} ,
      { "value" : "_:bbb", "type" : "uri"} 
    ] 
  }
},
rdfDataset = parse(rdfJsonIn),
rdfJsonOut = serialise(rdfDataset);

console.group('Quads in the RDF dataset:');
for (const quad of rdfDataset) {
  console.group('Quad:');
  console.info(`Subject:   ${quad.subject.termType} "${quad.subject.value}".`);
  console.info(`Predicate: ${quad.predicate.termType} "${quad.predicate.value}".`);
  console.info(`Object:    ${quad.object.termType}   "${quad.object.value}".`);
  console.groupEnd();
}
console.groupEnd();

console.info('\nRDF-JSON serialisation of the RDF dataset:\n', rdfJsonOut);
```

Sample output for the code above:

```text
Quads in the RDF dataset:
    Quad:
        Subject:   NamedNode "http://example.org/about".
        Predicate: NamedNode "http://purl.org/dc/terms/title".
        Subject:   Literal   "Anna's Homepage".
    Quad:
        Subject:   NamedNode "http://example.org/about".
        Predicate: NamedNode "http://purl.org/dc/terms/title".
        Subject:   Literal   "Annas hjemmeside".
    Quad:
        Subject:   NamedNode "http://example.org/about".
        Predicate: NamedNode "http://purl.org/dc/terms/title".
        Subject:   NamedNode   "https://vocab.qworum.net/user/".
    Quad:
        Subject:   NamedNode "http://example.org/about".
        Predicate: NamedNode "http://purl.org/dc/terms/title".
        Subject:   BlankNode   "bbb".

RDF-JSON serialisation of the RDF dataset:
 {
  "http://example.org/about": {
    "http://purl.org/dc/terms/title": [
      { value: "Anna's Homepage", type: "literal", lang: "en" },
      { value: "Annas hjemmeside", type: "literal" },
      { value: "https://vocab.qworum.net/user/", type: "uri" },
      { value: "_:bbb", type: "bnode" }
    ]
  }
}
```

∎
