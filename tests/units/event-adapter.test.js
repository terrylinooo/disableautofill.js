import EventAdapter from '../../src/core/event-adapter';
import { describe, test, expect, beforeEach, vi } from 'vitest';

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

  test('emit should dispatch an event if it exists', () => {
    eventAdapter.on('testEvent', mockHandler);
    eventAdapter.emit('testEvent');
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  test('emit should not dispatch an event if it does not exist', () => {
    eventAdapter.emit('nonExistentEvent');
    expect(mockHandler).not.toHaveBeenCalled();
  });

  test('mock should directly invoke the event handler', () => {
    eventAdapter.on('testEvent', mockHandler);
    const fakeEvent = new Event('testEvent');
    eventAdapter.mock('testEvent', fakeEvent);
    expect(mockHandler).toHaveBeenCalledWith(fakeEvent);
  });

  test('mock should not invoke the event handler if event does not exist', () => {
    const fakeEvent = new Event('nonExistentEvent');
    eventAdapter.mock('nonExistentEvent', fakeEvent);
    expect(mockHandler).not.toHaveBeenCalled();
  });
});
