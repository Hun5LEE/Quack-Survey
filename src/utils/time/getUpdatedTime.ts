const getUpdatedTime = (target: string | Date) => {
  const currentTime: number = Date.now();
  const targetTime: number = Date.parse(target.toString());
  const timeDiff: number = Math.floor((currentTime - targetTime) / 1000);

  if (0 < timeDiff && timeDiff < 60) return "방금 전";
  else if (60 <= timeDiff && timeDiff < 3600)
    return `${Math.floor(timeDiff / 60)}분 전`;
  else if (3600 <= timeDiff && timeDiff < 86400)
    return `${Math.floor(timeDiff / 3600)}시간 전`;
  else if (86400 <= timeDiff && timeDiff < 604800)
    return `${Math.floor(timeDiff / 86400)}일 전`;
  else if (604800 <= timeDiff && timeDiff < 2419200)
    return `${Math.floor(timeDiff / 604800)}주 전`;
  else return `${new Date(targetTime).toLocaleDateString()}`;
};

export { getUpdatedTime };
