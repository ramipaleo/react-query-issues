import { useState } from 'react';

import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { LoadingIcon } from '../../shared/components/LoadingIcon';

import { useIssues } from '../hooks/useIssues';
import { State } from '../interfaces/issue';

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();
  const { issuesQuery, page, nextPage, prevPage } = useIssues({ state, labels: selectedLabels });

  const onLabelChanged = (labelName: string) => {
    (selectedLabels.includes(labelName))
      ? setSelectedLabels( selectedLabels.filter(
        label => label !== labelName
      ))
      : setSelectedLabels([...selectedLabels, labelName])
  }
  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading
            ? (<LoadingIcon />)
            : (
              <IssueList
                issues={issuesQuery?.data || []}
                state={state}
                onStateChange={(state) => setState(state)}
              />
            )
        }

        <button className="btn btn-outline btn-primary mt-2">
          Load more..
        </button>
      </div>
      
      <div className="col-4">
        <LabelPicker
          selectedLabel={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  )
}