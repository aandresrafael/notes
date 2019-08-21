require 'rails_helper'

RSpec.describe FileNodesController, type: :controller do

  let(:parent1) { create(:file_node) }
  let(:parent2) { create(:file_node, name: 'folderB') }

  before do
    create_notes(15, parent1)
  end

  describe '#search' do
    it 'should search' do
      expect(FileNode.count).to eq(166)
      post :search, params: { query: 'folder-1' }
      expect(response.status).to eq(200)
      parsed_body = JSON.parse(response.body)

      expect(parsed_body['tree'].size).to eq(1)
    end
  end
end
