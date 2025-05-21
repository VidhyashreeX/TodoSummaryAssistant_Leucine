import React from 'react';

interface SummaryPanelProps {
  summary: string;
  lastGeneratedAt: string | null;
  isGenerating: boolean;
  isSendingToSlack: boolean;
  slackSendResult: { success: boolean; message: string } | null;
  onGenerateSummary: () => void;
  onSendToSlack: () => void;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({
  summary,
  lastGeneratedAt,
  isGenerating,
  isSendingToSlack,
  slackSendResult,
  onGenerateSummary,
  onSendToSlack,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-slate-800">Task Summary</h3>
        {lastGeneratedAt && (
          <span className="text-xs text-slate-500">Last generated: {lastGeneratedAt}</span>
        )}
      </div>

      {/* Loading State (when generating summary) */}
      {isGenerating && (
        <div className="py-6 text-center">
          <div className="inline-flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-slate-700 font-medium">Generating your summary<span className="loading"></span></p>
            <p className="text-slate-500 text-sm mt-1">This may take a few moments</p>
          </div>
        </div>
      )}

      {/* No summary yet */}
      {!isGenerating && !summary && (
        <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-200">
          <p className="text-slate-700 text-center">
            Click "Generate Summary" to create a summary of your pending tasks.
          </p>
        </div>
      )}

      {/* Summary content */}
      {!isGenerating && summary && (
        <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-200">
          <p className="text-slate-700 whitespace-pre-line">{summary}</p>
        </div>
      )}

      {/* Generate summary or Send to Slack */}
      <div className="flex items-center justify-between">
        {!summary ? (
          <button 
            onClick={onGenerateSummary}
            disabled={isGenerating}
            className="px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-indigo-600 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-icons mr-2">summarize</span>
            Generate Summary
          </button>
        ) : (
          <button 
            onClick={onSendToSlack}
            disabled={isSendingToSlack || !summary}
            className="px-4 py-2 border border-slack-btn text-slack-btn-text rounded-lg shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSendingToSlack ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slack-btn-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <span className="material-icons mr-2">send</span>
                Send to Slack
              </>
            )}
          </button>
        )}
        
        {/* Success message after sending */}
        {slackSendResult && (
          <div className={`flex items-center ${slackSendResult.success ? 'text-success' : 'text-error'}`}>
            <span className="material-icons mr-1 text-sm">{slackSendResult.success ? 'check_circle' : 'error'}</span>
            <span className="text-sm">{slackSendResult.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryPanel;
