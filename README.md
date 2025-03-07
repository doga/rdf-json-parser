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
Parse RDF-JSON to and RDF dataset, and back to RDF-JSON.
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

console.info('Quads in the RDF dataset:');
for (const quad of rdfDataset) {
  console.info('  Quad:');
  // print subject type
  console.info(`    subject "${quad.subject.value}" is a ${quad.subject.termType}`);
  console.info(`    predicate "${quad.predicate.value}" is a ${quad.predicate.termType}`);
  console.info(`    object "${quad.object.value}" is a ${quad.object.termType}`);
}

console.info(`
RDF-JSON serialisation of the dataset:
${JSON.stringify(rdfJsonOut, null, 2)}
`);
```

Sample output for the code above:

```text
Quads in the RDF dataset:
  Quad:
    subject "http://example.org/about" is a NamedNode
    predicate "http://purl.org/dc/terms/title" is a NamedNode
    object "Anna's Homepage" is a Literal
  Quad:
    subject "http://example.org/about" is a NamedNode
    predicate "http://purl.org/dc/terms/title" is a NamedNode
    object "Annas hjemmeside" is a Literal
  Quad:
    subject "http://example.org/about" is a NamedNode
    predicate "http://purl.org/dc/terms/title" is a NamedNode
    object "https://vocab.qworum.net/user/" is a NamedNode
  Quad:
    subject "http://example.org/about" is a NamedNode
    predicate "http://purl.org/dc/terms/title" is a NamedNode
    object "bbb" is a BlankNode

RDF-JSON serialisation of the dataset:
{
  "http://example.org/about": {
    "http://purl.org/dc/terms/title": [
      {
        "value": "Anna's Homepage",
        "type": "literal",
        "lang": "en"
      },
      {
        "value": "Annas hjemmeside",
        "type": "literal"
      },
      {
        "value": "https://vocab.qworum.net/user/",
        "type": "uri"
      },
      {
        "value": "_:bbb",
        "type": "bnode"
      }
    ]
  }
}
```

∎
