class CreateReveiws < ActiveRecord::Migration[7.0]
  def change
    create_table :reveiws do |t|
      t.string :title
      t.string :body
      t.integer :score
      t.integer :user_id
      t.integer :game_id

      t.timestamps
    end
  end
end
