const { propertyCoefficients } = require('./config');

// Add the property to the user and update his score
const assignGenericProperty = (users, entities, property) => {
  entities.forEach((entity) => {
    if (!entity || !entity.author) return;

    const user = users[entity.author.login];
    if (!user) return;

    // Increment the property's count
    user[property] = (user[property] || 0) + 1;

    user.score += propertyCoefficients[property];
  });
};

// Same as above, but commits are a bit different from others properties
const assignCommitProperty = (users, commits) => {
  commits.forEach((commit) => {
    if (!commit || !commit.author.user) return;

    const user = users[commit.author.user.login];
    if (!user) return;

    const { additions, deletions, changedFiles } = commit;
    const userCommits = user.commits || {};

    // Increment commit count, additions, deletions and changed files
    user.commits = {
      commitCount: (userCommits.commitCount || 0) + 1,
      additions: (userCommits.additions || 0) + additions,
      deletions: (userCommits.deletions || 0) + deletions,
      changedFiles: (userCommits.changedFiles || 0) + changedFiles,
    };

    const commitScore = additions * propertyCoefficients.additions
      + deletions * propertyCoefficients.deletions
      + changedFiles * propertyCoefficients.changedFiles
      + propertyCoefficients.commit;

    // And update user's score
    user.score += commitScore;
  });
};

module.exports = {
  assignGenericProperty,
  assignCommitProperty,
};
