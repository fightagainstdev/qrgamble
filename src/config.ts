export const rem = (nb: number) => Math.round((maxWidth() / 100) * 0.833333) * nb;
export const maxHeight = () => window.innerHeight;
export const maxWidth = () => window.innerWidth;
export const cardHeight = () => rem(15);
export const cardWidth = () => cardHeight() * 0.65;

export const INITIAL_DRAW = 3;
export const DRAW_ANIMATION_MS = 200;
export const NB_BENEDICTION_CARD = 2;

export const positions = {
  pile: () => ({ top: rem(1), left: rem(7) }),
  benedictionPile: () => ({ top: rem(1), left: rem(7) + (cardWidth() + rem(1)) }),
  discard: () => ({ top: rem(1), left: rem(7) + (cardWidth() + rem(1)) * 2 }),
  hand: (index: number) => ({
    top: maxHeight() - cardHeight() - rem(1),
    left: rem(7) + (cardWidth() + rem(1)) * index,
  }),
  benedictionHand: (index: number) => ({
    top: maxHeight() - cardHeight() - rem(1),
    left: maxWidth() - (cardWidth() + rem(1)) * (NB_BENEDICTION_CARD - index),
  }),
  center: () => ({ top: maxHeight() / 2 - cardHeight() / 2, left: maxWidth() / 2 - cardWidth() / 2 }),
  activeBenediction: () => ({ top: rem(1), left: maxWidth() - (cardWidth() + rem(1)) }),
};

export const maledictions = [
  { name: '过去的重量', desc: '向你的手牌中添加一张隐藏的宝藏卡', effect: 'past-weight' },
  { name: '增长的阴影', desc: '为一张你的宝藏卡增加2点', effect: 'growing-shadow' },
  { name: '无法避免的痛苦', desc: '向你的手牌中添加一张锁定的宝藏卡', effect: 'unavoidable-pain' },
  { name: '第十三的愤怒', desc: '为所有值为3的卡增加1', effect: '13th-rage' },
  { name: '虚假的希望', desc: '用牌堆中的一张卡替换你手牌中的一张随机卡', effect: 'false-hope' },
  {
    name: '命运的断裂',
    desc: '将一张宝藏卡的值减半，如果变为0则用牌堆中的一张卡替换',
    effect: 'destiny-fracture',
  },
  {
    name: '过去的回音',
    desc: '从弃牌堆中随机选择一张宝藏卡并添加到你的手牌中',
    effect: 'past-echo',
  },
];

export const benedictions = [
  { name: '闪避', desc: '将一张卡的值降低到0', effect: 'evasion', weight: 3 },
  {
    name: '保护 I',
    desc: '将一张选定的卡降低1点。如果达到0，该卡将被弃置',
    effect: 'protection',
    weight: 15,
    val: 1,
  },
  {
    name: '保护 II',
    desc: '将一张选定的卡降低2点。如果达到0，该卡将被弃置',
    effect: 'protection',
    weight: 12,
    val: 2,
  },
  {
    name: '保护 III',
    desc: '将一张选定的卡降低3点。如果达到0，该卡将被弃置',
    effect: 'protection',
    weight: 8,
    val: 3,
  },
  {
    name: '幸运切换',
    desc: '用同类型的卡替换你手牌中的一张卡',
    effect: 'lucky-switch',
    weight: 10,
  },
  {
    name: '未来的愿景',
    desc: '揭示牌堆顶的3张卡，选择1张保留，弃置2张',
    effect: 'future-vision',
    weight: 2,
  },
  {
    name: '第二阵风',
    desc: '保护你免于失败，但移除你所有的卡牌和积分',
    effect: 'second-wind',
    weight: 1,
  },
  {
    name: '第十三护符',
    desc: '取消一张诅咒卡或弃置以获得2积分',
    effect: '13th-talisman',
    weight: 4,
  },
];

export const deaths = [
  '在吞西瓜时',
  '在打开金枪鱼罐头时',
  '从长椅上摔下来时',
  '被乌龟壳击中时',
  '试图骑蜗牛时',
  '试图打破最长楔子记录时',
  '抗议头盔规定时',
  '掉进巨大的果冻碗里时',
  '被收藏的雪球堆压碎时',
];
