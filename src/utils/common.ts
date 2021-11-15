export const getSubmitInfo = (name: string) => {
  switch (name) {
    case 'title':
      return '#### Title\n\n- You can use the challenge title or your own title\n- The title will be shown in solution card';
    case 'description':
      return '#### Description\n\n- Try to explain the technologies you use and your experience while doing the challenge\n- Use Markdown to write and format your posts (optional)';
    case 'demoUrl':
      return '#### Demo URL\n\n- Host your solution and paste the URL here';
    case 'repoUrl':
      return '#### Repo URL\n\n- Your Github repository';
    case 'feedbackRequest':
      return '#### Feedback Request\n\n- You want to know what other think about solution? Write down your request here';
  }
};
