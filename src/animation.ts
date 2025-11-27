import { sleep, playDialog, getRandomIndex, getElementById } from './utils';
import Audio, { chords, loopLength, melody } from './audio';
import GameState from './GameState';
import { cardHeight, cardWidth, deaths } from './config';

export const deathEl = getElementById('death');
const floorEl = getElementById('floor');
const ghostEl = getElementById('ghost');
export const skipEl = getElementById('skip');
export const ghostLabel = getElementById('label1');
export const deathLabel = getElementById('label2');
export const sidebarEl = getElementById('sidebar');

function setGhostLabelPosition() {
  ghostLabel.style.left = `${ghostEl.offsetLeft + ghostEl.clientWidth / 2 - ghostLabel.clientWidth / 2}px`;
  ghostLabel.style.bottom = '31.25rem';
  ghostLabel.classList.add('br');
}

function setDeathLabelPosition() {
  deathLabel.style.right = 'auto';
  deathLabel.style.top = 'auto';
  deathLabel.style.left = `${deathEl.offsetLeft + deathEl.clientWidth / 3 - deathLabel.clientWidth / 2}px`;
  deathLabel.style.bottom = '31.25rem';
  deathLabel.classList.remove('rt');
  deathLabel.classList.add('bl');
}

export async function playIntroAnimation() {
  skipEl.style.opacity = '1';
  const randomDeath = deaths[getRandomIndex(deaths)];
  await playDialog(ghostLabel, [
    ['你死了', 1000],
    ['.', 300],
    ['.', 300],
    ['.', 1000],
    [` ${randomDeath}`, 2000],
  ]);

  setGhostLabelPosition();

  ghostEl.style.bottom = `2rem`;
  await sleep(200);
  // Show floor
  floorEl.style.bottom = '0';

  Audio.getInstance().playBgMusic(chords);
  setTimeout(() => {
    Audio.getInstance().playBgMusic(melody);
  }, loopLength * chords.notes.length);
  await sleep(500);

  await playDialog(ghostLabel, [
    ['哦天哪！\n', 300],
    ['不！ ', 200],
    ['不！ ', 200],
    ['不！\n', 200],
    ['我还有那么多事情要做！', 2000],
  ]);

  await playDialog(ghostLabel, [
    ["下午1点还有GZY的烧烤…\n", 1000],
    ["还有13号的湖人队决赛…\n", 1000],
    ["我现在不能死！", 1000],
  ]);
  deathEl.style.right = `25%`;
  await sleep(1000);

  setDeathLabelPosition();
  await playDialog(deathLabel, [
    ['哎呀！我们这里有什么？\n', 600],
    ["又是一个愚蠢的死亡，我猜？\n", 600],
    ['这次是怎么回事？', 1500],
  ]);

  await playDialog(ghostLabel, [[`我死于${randomDeath}…`, 1500]]);
  await playDialog(deathLabel, [
    ['*轻笑*\n', 500],
    ['我明白了…\n', 1500],
    ["好吧，走吧！我还有事情要做！", 1500],
  ]);
  deathEl.style.animationName = 'flippedFloat';
  deathEl.style.right = `5%`;
  await sleep(500);

  await playDialog(ghostLabel, [['等等！', 1000]]);
  deathEl.style.animationName = 'float';
  await sleep(200);
  deathEl.style.right = `25%`;
  await sleep(500);

  await playDialog(ghostLabel, [
    ["我必须回去！我现在不能死。\n", 1000],
    ['我还有重要的事情要做！', 1500],
  ]);
  await playDialog(deathLabel, [["老兄，这不是这么运作的，你不能选择。", 1000]]);
  await playDialog(ghostLabel, [["你不能再给我一次机会吗？", 2000]]);
  await playDialog(deathLabel, [
    ['.', 300],
    ['.', 300],
    ['.', 1500],
  ]);
  await playDialog(deathLabel, [
    ["好吧，让我们试试别的！\n", 1000],
    ["如果你能赢我选的游戏，我就再给你一些时间。\n", 1000],
    ['成交？', 1000],
  ]);
  await playDialog(ghostLabel, [['绝对！成交！', 1500]]);
  await playDialog(deathLabel, [["*坏笑* 好吧，那我们开始吧！", 1500]]);
  deathEl.style.animationName = 'flippedFloat';
  deathEl.style.right = `-31.25rem`;
  ghostEl.style.transition = 'all 1.4s linear';
  ghostEl.style.left = '100%';
  await sleep(2000);
  leave();
  repositionAllElements();
}

async function leave() {
  deathEl.style.animationName = 'flippedFloat';
  deathEl.style.right = `-31.25rem`;
  ghostEl.style.transition = 'all 1.4s linear';
  ghostEl.style.left = '100%';
  await sleep(2000);
}

export async function showDeath() {
  deathEl.style.display = 'block';
  deathEl.style.right = '12.5rem';
  deathEl.style.bottom = 'calc(100vh - 23rem - 2rem)';
}

export async function playTutorialBegining() {
  deathEl.style.display = 'block';
  deathEl.style.animation = 'incoming ease-in-out 2s forwards';
  await sleep(2300);
  deathEl.style.right = '12.5rem';
  deathEl.style.transition = 'none';
  deathEl.style.bottom = 'calc(100vh - 23rem - 2rem)';
  deathEl.style.animation = 'float 4s 0.1s infinite';
  deathLabel.classList.remove('br', 'bl');
  deathLabel.classList.add('rt');
  deathLabel.style.right = '30rem';
  deathLabel.style.top = '6rem';
  deathLabel.style.bottom = 'auto';
  deathLabel.style.left = 'auto';
  await playDialog(deathLabel, [
    ["好吧！这就是游戏！\n", 1000],
    ['你看到那边的那两堆牌了吗！', 1000],
  ]);
}

export async function playPilePresentation() {
  await playDialog(deathLabel, [
    ["左边那一堆装满了4套最多到6的卡牌。\n", 2000],
    ['右边那一堆是祝福卡牌。\n', 2000],
    ['你的目标是清空左边的牌堆。', 3000],
  ]);
  await playDialog(deathLabel, [
    ['但不能让你的手牌总数达到13或以上。\n', 1000],
    ['看起来很公平，对吧？', 2000],
  ]);
}

export async function playHandPresentation() {
  await playDialog(deathLabel, [
    ['哦对了，我有没有提到我在这里加了一些特殊的诅咒卡牌来增加趣味性？', 2000],
  ]);
  await playDialog(deathLabel, [
    ["什么？这不可能完成？\n", 1000],
    ['好吧！这里！', 1500],
  ]);
}

export async function playBenedictionHandPresentation() {
  await playDialog(deathLabel, [
    ["我会给你2张祝福卡。\n", 1500],
    ["天哪！我今天真的很大方！", 2500],
  ]);
  await playDialog(deathLabel, [
    ['祝福卡的规则很简单。\n', 2000],
    ["每弃置一张绿色宝藏卡，你就会得到1积分。\n", 2000],
    ['弃置红色宝藏卡什么都得不到。', 3000],
  ]);
  await playDialog(deathLabel, [
    ['如果你把一张卡降到0或以下，你会获得1个额外积分。\n', 2000],
    ['如果你有足够的积分，卡牌会自动抽取。', 4000],
  ]);
  await playDialog(deathLabel, [["好吧，让我们看看你表现如何！", 2500]]);
}

export function repositionAllElements(complete: boolean = false) {
  skipEl.style.opacity = '0';
  floorEl.style.opacity = '0';
  floorEl.style.bottom = '-3rem';
  ghostLabel.style.opacity = '0';
  ghostEl.style.transition = 'none';
  ghostEl.style.opacity = '0';
  ghostEl.style.bottom = '2rem';
  ghostEl.style.left = '-2rem';
  ghostEl.style.animation = 'float 4s 0.1s infinite';
  if (complete) {
    deathLabel.style.opacity = '0';
    deathEl.style.transition = 'none';
    deathEl.style.right = 'calc(-20rem * var(--scytheRatio))';
    deathEl.style.bottom = '2rem';
    deathEl.style.animationName = 'float';
  }
}

async function initStop(state: GameState) {
  state.ready = false;
  getElementById('instruction').style.opacity = '0';
  getElementById('card-remaining').style.opacity = '0';
  getElementById('credits').style.opacity = '0';
  await sleep(800);
  ghostEl.style.transition = 'all .8s linear';
  deathEl.style.transition = 'all .8s linear';
  Object.keys(state.cardById).forEach((id) => {
    const cardEl = getElementById(id);
    cardEl.style.left = `-${cardWidth()}px`;
    cardEl.style.top = `-${cardHeight()}px`;
  });
}

async function initEndScene() {
  sidebarEl.classList.remove('active')
  skipEl.style.opacity = '1';
  floorEl.style.opacity = '1';
  floorEl.style.bottom = '0';
  await sleep(300);

  ghostEl.style.opacity = '1';
  deathEl.style.bottom = `2rem`;
  deathEl.style.right = `25%`;
  ghostEl.style.left = `calc(32% - (13rem / 2) - 1rem)`;
  await sleep(800);
  setGhostLabelPosition();
  setDeathLabelPosition();
}

export async function playBadEndingAnimation(state: GameState) {
  await initStop(state);
  await initEndScene();
  await playDialog(deathLabel, [
    ['嗯…\n', 1000],
    ["看来这次运气不在你这边。", 2000],
  ]);

  await playDialog(deathLabel, [
    ['呵 ', 500],
    ['呵 ', 500],
    ['呵 ', 500],
    ['呵 ', 500],
    ['呵\n', 500],
    ['*咳嗽*\n', 500],
    ["好吧，让我们进入你的下一世！\n", 1000],
    ["我们会为你在地狱里找个舒适的地方！", 2000],
  ]);

  await playDialog(ghostLabel, [
    ['哦天哪真的吗！\n', 1000],
    ['好吧至少我试过了…', 2000],
  ]);
  await leave();

  repositionAllElements(true);
}

export async function playGoodEndingAnimation(state: GameState) {
  await initStop(state);
  await initEndScene();
  await playDialog(ghostLabel, [
    ["让我们走吧！！！！\n", 1000],
    ['接招吧，你这个愚蠢的死神！', 2500],
  ]);
  await playDialog(ghostLabel, [
    ["嗯…抱歉。\n", 1000],
    ["我是说我赢了你的游戏，现在可以回去了吗？", 2500],
  ]);

  await playDialog(deathLabel, [
    ['*叹气*\n', 1000],
    ["好吧，你再得到13天的生命，之后我会回来收割你！", 2000],
  ]);

  await playDialog(ghostLabel, [['太棒了！\n', 1000], ['等等只有13天…？\n', 2000]]);
  await playDialog(deathLabel, [["快点，我可没那么多时间！", 2000]]);
  await leave();

  repositionAllElements(true);
}
