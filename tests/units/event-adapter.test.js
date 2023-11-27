import EventAdapter from '../../src/core/event-adapter';
import { describe, test, expect, beforeEach } from 'vitest';

describe('EventAdapter class', () => {
  let eventAdapter;
  let mockElement;
  let mockHandler;

  beforeEach(() => {
    mockElement = new EventTarget();
    eventAdapter = new EventAdapter(mockElement);
    mockHandler = vi.fn();
  });

  test('should add and handle an event', () => {
    eventAdapter.on('testEvent', mockHandler);
    mockElement.dispatchEvent(new Event('testEvent'));
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  test('should remove an event', () => {
    eventAdapter.on('testEvent', mockHandler);
    eventAdapter.off('testEvent');
    mockElement.dispatchEvent(new Event('testEvent'));
    expect(mockHandler).not.toHaveBeenCalled();
  });

  test('should destroy all events', () => {
    eventAdapter.on('testEvent', mockHandler);
    eventAdapter.destroy();
    mockElement.dispatchEvent(new Event('testEvent'));
    expect(mockHandler).not.toHaveBeenCalled();
  });
});