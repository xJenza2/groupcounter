var currentMembers = null;
const url = "https://groups.roblox.com/v1/groups/32480701";

async function post(client) {
  var request;

  try {
    request = await axios({
      method: "get",
      url: url,
    });
  } catch (error) {
    console.error(error);
    return;
  }

  const data = request["data"];
  const members = data["memberCount"];

  if (currentMembers == null) {
    currentMembers = members;
  } else {
    const diff = members - currentMembers;
    currentMembers = members;
    var content;

    if (diff !== 0) {
      if (diff > 0) {
        var p = "";
        if (diff !== 1) {
          p = "s";
        }

        content = `⭐ We have gained ${diff} new member${p}! (Goal: **${formatCommas(
          currentMembers
        )}/${formatCommas(getMemberGoal(currentMembers))} members**)`;
      } else if (diff < 0) {
        var p = "";
        if (Math.abs(diff) !== 1) {
          p = "s";
        }

        content = `😭 We have lost ${
          diff * -1
        } member${p}. (Goal: **${formatCommas(currentMembers)}/${formatCommas(
          getMemberGoal(currentMembers)
        )} members**)`;
      }

      const server = client.guilds.cache.get("1343350810121080915");
      const channel = server.channels.cache.get("1346506115201892404");

      await channel.send({
        content: content,
      });
    }
  }
}
