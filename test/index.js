import test from 'tape';

import {
    deleter,
    editor,
    getOverlap,
    writer
} from '../typical.js';

test('deleter', t => {
    t.ok(
        deleter('text')[Symbol.iterator],
        'Should create an iterable'
    );

    t.deepEqual(
        [...deleter('text')],
        ['tex', 'te', 't', ''],
        'Should create correct steps'
    );

    t.deepEqual(
        [...deleter('')],
        [],
        'Should handle empty string'
    )

    t.end();
});

test('editor', t => {
    t.ok(
        editor(deleter('text'))[Symbol.iterator],
        'Should create an iterable'
    );

    t.ok(
        [...editor(writer('text'))].length === 4,
        'Should have correct length'
    );

    t.equal(
        typeof editor(deleter('text')).next().value,
        'function',
        'Should yield functions'
    );

    t.end();
});

test('getOverlap', t => {
    t.ok(
        getOverlap('some text', 'some other text') === 5,
        'Should handle partial overlap'
    );

    t.ok(
        getOverlap('some text', 'other text') === 0,
        'Should handle no overlap'
    );

    t.ok(
        getOverlap('some text', 'some text') === 9,
        'Should handle complete overlap'
    );

    t.ok(
        getOverlap('some text', 'some text and') === 9,
        'Should handle write only'
    );

    t.ok(
        getOverlap('some text', 'some') === 4,
        'Should handle delete only'
    );

    t.end();
});

test('writer', t => {
    t.ok(
        writer('text')[Symbol.iterator],
        'Should create an iterable'
    );

    t.deepEqual(
        [...writer('text')],
        ['t', 'te', 'tex', 'text'],
        'Should create correct steps'
    );

    t.deepEqual(
        [...writer('')],
        [],
        'Should handle empty string'
    );

    t.end();
});
