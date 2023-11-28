class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_one :profile
  has_many :reviews
end
