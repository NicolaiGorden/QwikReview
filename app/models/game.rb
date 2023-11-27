class Game < ApplicationRecord
    validates :guid, presence: true, uniqueness: {message: "game already exists!"}

    has_many :reviews
    has_many :users, through: :reviews

end
