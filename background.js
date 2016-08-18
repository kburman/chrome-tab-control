var MaxTabs = 5;
var currCount = 0;

function UpdateTabCount(cb)
{
	chrome.tabs.query({}, function (tabs) {
		currCount = tabs.length;
		cb(tabs.length);
	});
}

function TabCreated(tab) {
	if (currCount >= MaxTabs) {
		chrome.tabs.remove(tab.id);
	}
	UpdateTabCount(showCounter);
}

function TabRemoved(tab) {
	UpdateTabCount(showCounter);
}

function TabUpdated(tab) {
	UpdateTabCount(showCounter);
}

function showCounter(count)
{
	var leftTabs =  MaxTabs - count;
	if (leftTabs < 0) leftTabs = 0;
	chrome.browserAction.setBadgeText({'text': leftTabs + " left"});
}

function start()
{
	chrome.tabs.onCreated.addListener(TabCreated);
    chrome.tabs.onRemoved.addListener(TabRemoved);
    chrome.tabs.onUpdated.addListener(TabUpdated);
	UpdateTabCount(showCounter);
}

start();