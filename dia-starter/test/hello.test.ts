/**
 * @fileoverview Tests for the hello module.
 * @author your instructors
 * @lastUpdated 2024-01-04
 */

import { expect, test, vi } from 'vitest';
import { createHelloMessage, sayHello } from '../src/hello';

// tests whether:
// - createHelloMessage() in hello module returns the expected string
test('create "Hello, immersive world!" message', () => {
    expect(createHelloMessage('immersive world')).toBe('Hello, immersive world!');
});

// tests whether:
// - sayHello() in hello module logs the expected string to the console
const logSpy = vi.spyOn(console, 'log');
test('say "Hello, immersive world!" in the console', () => {
    sayHello('immersive world');
    expect(logSpy).toHaveBeenLastCalledWith('Hello, immersive world!');
});
