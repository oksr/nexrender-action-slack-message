const { WebClient } = require("@slack/web-api");
const token = process.env.SLACK_TOKEN;

module.exports = (job, settings, action, type) => {
  
  const slackWeb = new WebClient(token);
  const icon_emoji = type === 'prerender' ? ':robot_face:' : ':white_check_mark:';
  const attachments = getAttachments(job, type);

  return new Promise((resolve, reject) => {
    slackWeb.chat
      .postMessage({
        channel: action.conversationId,
        username: 'Render Bot',
        text: 'New alert', // or if you want to use it dynamically with action.text 
        icon_emoji: icon_emoji,
        attachments: attachments,
      })
      .then((res) => {
        console.log(
          `Successfully send message ${res.ts} in conversation ${action.conversationId}`
        );
        resolve(job);
      })
      .catch((e) => {
        console.log(`*** slack action error: ${e.data.error} ***`);
        reject(e);
      });
  });
};


// Here you can edit the attachment send to slack as message
function getAttachments(job, type) {
  if (type === 'prerender') {
    return [
      {
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: 'Render start 🚀',
              emoji: true,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: 'Job Details:',
              emoji: true,
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Job uid:*\n ${job.uid}`,
              },
              {
                type: 'mrkdwn',
                text: `*Composition:*\n ${job.template.composition}`,
              },
            ],
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Template src:*\n ${job.template.src}`,
              },
              {
                type: 'mrkdwn',
                text: `*Output:*\n ${job.output}`,
              },
            ],
          },
        ],
      },
    ];
  } else {
    return [
      {
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: 'Render Finished ✅',
              emoji: true,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: 'Job Details:',
              emoji: true,
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Job uid:*\n ${job.uid}`,
              },
              {
                type: 'mrkdwn',
                text: `*Output:*\n ${job.output}`,
              },
            ],
          },
        ],
      },
    ];
  }
}
