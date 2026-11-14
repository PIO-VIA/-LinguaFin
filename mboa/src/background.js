const api = globalThis.browser || globalThis.chrome;

api.commands.onCommand.addListener(async (command) => {
  const [tab] = await api.tabs.query({ active: true, currentWindow: true });
  if (tab?.id != null) api.tabs.sendMessage(tab.id, { type: command }).catch(() => {});
});

api.runtime.onMessage.addListener((msg) => {
  if (msg?.type === 'open-studio') api.tabs.create({ url: api.runtime.getURL('studio/studio.html') });
});

api.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') api.storage.sync.set({ firstRun: true });
});
