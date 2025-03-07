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
<summary>Parse RDF-JSON</summary>

<pre>
description = '''
Parse an RDF-JSON object and produce an RDF dataset.
'''
</pre>
</details>

```javascript
import {parse} from 'https://esm.sh/gh/doga/rdf-json-parser@1.0.1/mod.mjs';

const rdfDataset = 
parse({
  "http://example.org/about" : {
    "http://purl.org/dc/terms/title" : [
      { "value" : "Anna's Homepage", "type" : "literal", "lang" : "en" },
      { "value" : "Annas hjemmeside", "type" : "literal"},
      { "value" : "https://vocab.qworum.net/user/", "type" : "uri"} ,
      { "value" : "_:bbb", "type" : "uri"} 
    ] 
  }
});

console.info('Quads in the dataset:');
for (const quad of rdfDataset) {
  console.info('  Quad:');
  // print subject type
  console.info(`    subject "${quad.subject.value}" is a ${quad.subject.termType}`);
  console.info(`    predicate "${quad.predicate.value}" is a ${quad.predicate.termType}`);
  console.info(`    object "${quad.object.value}" is a ${quad.object.termType}`);
}
```

Sample output for the code above:

```text
Quads in the dataset:
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
```

∎
