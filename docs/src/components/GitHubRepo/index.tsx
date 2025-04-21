import React, { JSX, useEffect, useState } from 'react';
import styles from './styles.module.css';

interface GitHubRepoProps {
  owner: string;
  repo: string;
}

interface RepoData {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  license?: {
    name: string;
  };
  default_branch: string;
}

export default function GitHubRepo({ owner, repo }: GitHubRepoProps): JSX.Element {
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepoData() {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (!response.ok) {
          throw new Error(`GitHub API responded with status ${response.status}`);
        }
        const data = await response.json();
        setRepoData(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repository data');
        setLoading(false);
      }
    }

    fetchRepoData();
  }, [owner, repo]);

  if (loading) {
    return (
      <div className={styles.repoCard}>
        <div className={styles.loading}>Loading repository data...</div>
      </div>
    );
  }

  if (error || !repoData) {
    return (
      <div className={styles.repoCard}>
        <div className={styles.error}>
          Failed to load repository data: {error || 'Unknown error'}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.repoCard}>
      <div className={styles.header}>
        <svg className={styles.githubIcon} viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        <a href={repoData.html_url} target="_blank" rel="noopener noreferrer" className={styles.repoName}>
          {owner}/{repoData.name}
        </a>
      </div>
      
      <p className={styles.description}>{repoData.description}</p>
      
      <div className={styles.stats}>
        <a href={`${repoData.html_url}/stargazers`} target="_blank" rel="noopener noreferrer" className={styles.stat}>
          <span className={styles.statIcon}>★</span>
          <span className={styles.statText}>{repoData.stargazers_count}</span>
        </a>
        <a href={`${repoData.html_url}/network/members`} target="_blank" rel="noopener noreferrer" className={styles.stat}>
          <svg className={styles.forkIcon} viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
          </svg>
          <span className={styles.statText}>{repoData.forks_count}</span>
        </a>
        <a href={`${repoData.html_url}/issues`} target="_blank" rel="noopener noreferrer" className={styles.stat}>
          <svg className={styles.issueIcon} viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            <path fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
          </svg>
          <span className={styles.statText}>{repoData.open_issues_count}</span>
        </a>
      </div>
      
      <div className={styles.footer}>
        {repoData.license && (
          <span className={styles.license}>
            <svg className={styles.licenseIcon} viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.001-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path>
            </svg>
            {repoData.license.name}
          </span>
        )}
        <span className={styles.branch}>
          <svg className={styles.branchIcon} viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"></path>
          </svg>
          {repoData.default_branch}
        </span>
      </div>
    </div>
  );
}