class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :bio
    belongs_to :user
end
