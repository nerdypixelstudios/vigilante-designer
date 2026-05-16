/**
 * Course Helper Utilities (demo copy — no changes needed)
 */

const flattenActivities = (regularBlocks) => {
  const list = [];
  for (let blockIdx = 0; blockIdx < regularBlocks.length; blockIdx++) {
    const block = regularBlocks[blockIdx];
    if (block.children) {
      for (let unitIdx = 0; unitIdx < block.children.length; unitIdx++) {
        const unit = block.children[unitIdx];
        if (unit.contentItems) {
          for (let actIdx = 0; actIdx < unit.contentItems.length; actIdx++) {
            list.push({
              activity: unit.contentItems[actIdx],
              blockIndex: blockIdx,
              unitIndex: unitIdx,
              activityIndex: actIdx,
              numbering: `${blockIdx + 1}.${unitIdx + 1}.${actIdx + 1}`,
            });
          }
        }
      }
    }
    if (block.contentItems) {
      for (let actIdx = 0; actIdx < block.contentItems.length; actIdx++) {
        list.push({
          activity: block.contentItems[actIdx],
          blockIndex: blockIdx,
          unitIndex: null,
          activityIndex: actIdx,
          numbering: `${blockIdx + 1}.${actIdx + 1}`,
        });
      }
    }
  }
  return list;
};

export const findCurrentActivityFromLastVisited = ({
  lastVisitedActivity,
  diagnosticStatus,
  regularBlocks,
  isPaceOn,
  shadedActivityIds,
}) => {
  if (!regularBlocks || regularBlocks.length === 0) return null;
  const flatList = flattenActivities(regularBlocks);
  if (flatList.length === 0) return null;

  if (!lastVisitedActivity) {
    if (diagnosticStatus === 'COMPLETED') {
      const first = flatList[0];
      return { activity: first.activity, numbering: first.numbering, blockIndex: first.blockIndex, ctaVariant: 'start-first' };
    }
    return null;
  }

  const lastVisitedId = String(lastVisitedActivity.contentId);
  const matchIndex = flatList.findIndex(entry => String(entry.activity.contentId) === lastVisitedId);
  if (matchIndex === -1) return null;

  const matched = flatList[matchIndex];
  const shadedSet = isPaceOn ? new Set(shadedActivityIds.map(String)) : null;
  const isShaded = (entry) => shadedSet && shadedSet.has(String(entry.activity.contentId));
  const ctaForActivity = (entry) => entry.activity.progressStatus === 'NOT_STARTED' ? 'start-next' : 'resume';

  if (matched.activity.progressStatus !== 'COMPLETED') {
    if (!isShaded(matched)) {
      return { activity: matched.activity, numbering: matched.numbering, blockIndex: matched.blockIndex, ctaVariant: ctaForActivity(matched) };
    }
  }

  for (let i = matchIndex + 1; i < flatList.length; i++) {
    const entry = flatList[i];
    if (entry.activity.progressStatus === 'COMPLETED') continue;
    if (isShaded(entry)) continue;
    return { activity: entry.activity, numbering: entry.numbering, blockIndex: entry.blockIndex, ctaVariant: ctaForActivity(entry) };
  }

  return null;
};

export const findCurrentModule = (blocks) => {
  if (!blocks || blocks.length === 0) return null;
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.contentItems?.some(item => item.progressStatus === 'INPROGRESS')) return { block, index: i };
    if (block.children) {
      for (const child of block.children) {
        if (child.contentItems?.some(item => item.progressStatus === 'INPROGRESS')) return { block, index: i };
      }
    }
  }
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.completedContent > 0 && block.completedContent < block.totalContent) return { block, index: i };
  }
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].completedContent < blocks[i].totalContent) return { block: blocks[i], index: i };
  }
  return blocks.length > 0 ? { block: blocks[0], index: 0 } : null;
};

export const findCurrentUnitIndex = (units) => {
  if (!units || units.length === 0) return 0;
  for (let i = 0; i < units.length; i++) {
    if (units[i].contentItems?.some(item => item.progressStatus === 'INPROGRESS')) return i;
  }
  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    if (unit.completedContent > 0 && unit.completedContent < unit.totalContent) return i;
  }
  for (let i = 0; i < units.length; i++) {
    if (units[i].completedContent < units[i].totalContent) return i;
  }
  return 0;
};
