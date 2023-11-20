class GameSerializer < ActiveModel::Serializer
  attributes :id, :guid, :name, :art

  has_many :reviews
end
