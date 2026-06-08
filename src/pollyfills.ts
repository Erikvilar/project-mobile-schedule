import {
  ReadableStream,
  WritableStream,
  TransformStream,
} from 'web-streams-polyfill';


if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream = ReadableStream as any;
}

if (typeof global.WritableStream === 'undefined') {
  global.WritableStream = WritableStream as any;
}

if (typeof global.TransformStream === 'undefined') {
  global.TransformStream = TransformStream as any;
}
