<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RecalamtionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $reclamtions = [
            ['title' => 'Lorem ipsum', 'text' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, repellendus ea! Labore consequuntur laborum modi maxime.', 'comment' => 'Lorem ipsum dolor sit.', 'user_id' => 2, 'statut_id' => 1, 'type_id' => 1],
            ['title' => 'Lorem ipsum 2', 'text' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, repellendus ea! Labore consequuntur laborum modi maxime. 2', 'comment' => 'Lorem ipsum dolor sit 2.', 'user_id' => 2, 'statut_id' => 2, 'type_id' => 2],
        ];


        foreach ($reclamtions as $reclamtion) {
            DB::table('reclamtions')->insert([
                'title' => $reclamtion['title'],
                'text' => $reclamtion['text'],
                'comment' => $reclamtion['comment'],
                'user_id' => $reclamtion['user_id'],
                'statut_id' => $reclamtion['statut_id'],
                'type_id' => $reclamtion['type_id'],
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);
        }
    }
}
